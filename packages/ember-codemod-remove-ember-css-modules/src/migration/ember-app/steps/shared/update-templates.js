import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ASTHandlebars as AST } from '@codemod-utils/ast';
import { createFiles } from '@codemod-utils/files';

function sanitizeClassAndLocalClassAttributes(file) {
  function removeAttributeWithoutValue(attributeName, attributes) {
    const attributeIndex = attributes.findIndex(
      (attribute) => attribute.name === attributeName,
    );

    if (attributeIndex === -1) {
      return;
    }

    const attribute = attributes[attributeIndex];

    if (attribute.isValueless) {
      attributes.splice(attributeIndex, 1);
      return;
    }

    if (attribute.value.type !== 'TextNode') {
      return;
    }

    const attributeValue = attribute.value.chars.trim();

    if (attributeValue === '') {
      attributes.splice(attributeIndex, 1);
      return;
    }
  }

  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      const { attributes } = node;

      removeAttributeWithoutValue('class', attributes);
      removeAttributeWithoutValue('local-class', attributes);
    },
  });

  return AST.print(ast);
}

function mergeClassAndLocalClassAttributes(file, data) {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      // Check that both class and local-class attributes exist
      const { attributes } = node;

      const localClassAttributeIndex = attributes.findIndex(
        (attribute) => attribute.name === 'local-class',
      );
      const classAttributeIndex = attributes.findIndex(
        (attribute) => attribute.name === 'class',
      );

      if (localClassAttributeIndex === -1 || classAttributeIndex === -1) {
        return;
      }

      // Merge attributes only when both have TextNode values
      const localClassAttribute = attributes[localClassAttributeIndex];
      const classAttribute = attributes[classAttributeIndex];

      if (
        localClassAttribute.value.type !== 'TextNode' ||
        classAttribute.value.type !== 'TextNode'
      ) {
        return;
      }

      const localClassAttributeValue = localClassAttribute.value.chars.trim();
      const classAttributeValue = classAttribute.value.chars.trim();

      // Update the class attribute
      const localClassNames = localClassAttributeValue.split(/\s+/);
      let params;

      if (localClassNames.length === 1) {
        params = [
          AST.builders.path(`this.${data.__styles__}.${localClassNames[0]}`),
          AST.builders.string(` ${classAttributeValue}`),
        ];
      } else {
        params = [
          AST.builders.sexpr('local-class', [
            AST.builders.path(`this.${data.__styles__}`),
            ...localClassNames.map(AST.builders.string),
          ]),
          AST.builders.string(` ${classAttributeValue}`),
        ];
      }

      attributes[classAttributeIndex].value = AST.builders.mustache(
        AST.builders.path('concat'),
        params,
      );

      // Remove the local-class attribute
      attributes.splice(localClassAttributeIndex, 1);
    },
  });

  return AST.print(ast);
}

function removeLocalClassHelpers(file, data) {
  /*
    The {{local-class}} helper from ember-css-modules allows
    1 positional argument. The argument's value is presumed
    to be a concatenated string or `undefined`.
  */
  function canRemoveLocalClassHelper(path) {
    const hasFromArgument = path.hash.pairs.some((pair) => pair.key === 'from');

    if (hasFromArgument) {
      throw new RangeError(
        `Unable to handle the {{local-class}} helper's \`from\` key. See lines ${path.loc.start.line}-${path.loc.end.line}.`,
      );
    }

    const param = path.params[0];

    if (param === undefined) {
      return true;
    }

    if (param.type !== 'StringLiteral') {
      return false;
    }

    const value = param.value.trim();

    return value === '';
  }

  const traverse = AST.traverse();

  const ast = traverse(file, {
    AttrNode(node) {
      if (node.name !== 'class') {
        return;
      }

      const hasLocalClassHelper =
        node.value.type === 'MustacheStatement' &&
        node.value.path.original === 'local-class';

      if (!hasLocalClassHelper) {
        return;
      }

      if (canRemoveLocalClassHelper(node.value)) {
        return null;
      }

      const param = node.value.params[0];

      if (param.type !== 'StringLiteral') {
        return;
      }

      const localClassNames = param.value.trim().split(/\s+/);

      if (localClassNames.length === 1) {
        node.value = AST.builders.mustache(
          AST.builders.path(`this.${data.__styles__}.${localClassNames[0]}`),
        );

        return;
      }

      node.value = AST.builders.mustache(AST.builders.path('local-class'), [
        AST.builders.path(`this.${data.__styles__}`),
        ...localClassNames.map(AST.builders.string),
      ]);
    },

    SubExpression(node) {
      const hasLocalClassHelper = node.path.original === 'local-class';

      if (!hasLocalClassHelper) {
        return;
      }

      if (canRemoveLocalClassHelper(node)) {
        return AST.builders.string('');
      }

      const param = node.params[0];

      if (param.type !== 'StringLiteral') {
        return node;
      }

      const localClassNames = param.value.trim().split(/\s+/);

      if (localClassNames.length === 1) {
        return AST.builders.path(
          `this.${data.__styles__}.${localClassNames[0]}`,
        );
      }

      return AST.builders.sexpr(AST.builders.path('local-class'), [
        AST.builders.path(`this.${data.__styles__}`),
        ...localClassNames.map(AST.builders.string),
      ]);
    },
  });

  return AST.print(ast);
}

function removeLocalClassAttributes(file, data) {
  function transformParam(param) {
    switch (param.type) {
      case 'StringLiteral': {
        const localClassNames = param.value.trim().split(/\s+/);

        if (localClassNames.length === 1) {
          param.value = localClassNames[0];
        } else {
          param = AST.builders.sexpr(
            'array',
            localClassNames.map(AST.builders.string),
          );
        }

        break;
      }

      case 'SubExpression': {
        switch (param.path.original) {
          case 'if':
          case 'unless': {
            const subparams = param.params.map(transformParam);

            param = AST.builders.sexpr(param.path.original, subparams);

            break;
          }
        }

        break;
      }
    }

    return param;
  }

  function transformPart(part) {
    switch (part.type) {
      case 'MustacheStatement': {
        switch (part.path.original) {
          case 'concat': {
            // eslint-disable-next-line no-inner-declarations
            function hasPathExpression(params) {
              return params.some((param) => param.type === 'PathExpression');
            }

            if (hasPathExpression(part.params)) {
              return AST.builders.mustache(AST.builders.path('get'), [
                AST.builders.path(`this.${data.__styles__}`),
                AST.builders.sexpr(part.path.original, part.params),
              ]);
            }

            const params = part.params.map(transformParam);

            return AST.builders.mustache('local-class', [
              AST.builders.path(`this.${data.__styles__}`),
              ...params,
            ]);
          }

          case 'if':
          case 'unless': {
            const params = part.params.map(transformParam);

            return AST.builders.mustache('local-class', [
              AST.builders.path(`this.${data.__styles__}`),
              AST.builders.sexpr(part.path.original, params),
            ]);
          }

          default: {
            return AST.builders.mustache(AST.builders.path('get'), [
              AST.builders.path(`this.${data.__styles__}`),
              part.path,
            ]);
          }
        }
      }

      case 'TextNode': {
        const value = part.chars.trim();

        if (value === '') {
          return part;
        }

        const localClassNames = value.split(/\s+/);

        if (localClassNames.length === 1) {
          return AST.builders.mustache(
            AST.builders.path(`this.${data.__styles__}.${localClassNames[0]}`),
          );
        }

        return AST.builders.mustache(AST.builders.path('local-class'), [
          AST.builders.path(`this.${data.__styles__}`),
          ...localClassNames.map(AST.builders.string),
        ]);
      }
    }
  }

  function transformParts(parts) {
    const numParts = parts.length;

    return parts.reduce((accumulator, part, index) => {
      accumulator.push(transformPart(part));

      if (index < numParts - 1) {
        accumulator.push(AST.builders.text(' '));
      }

      return accumulator;
    }, []);
  }

  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      // Check if the local-class attribute (still) exists
      const { attributes } = node;

      const localClassAttributeIndex = attributes.findIndex(
        (attribute) => attribute.name === 'local-class',
      );

      if (localClassAttributeIndex === -1) {
        return;
      }

      // Change the local-class attribute to class
      const localClassAttribute = attributes[localClassAttributeIndex];

      switch (localClassAttribute.value.type) {
        case 'ConcatStatement': {
          localClassAttribute.name = 'class';
          localClassAttribute.value.parts = transformParts(
            localClassAttribute.value.parts,
          );

          break;
        }

        case 'MustacheStatement': {
          localClassAttribute.name = 'class';
          localClassAttribute.value = transformPart(localClassAttribute.value);

          break;
        }

        case 'TextNode': {
          localClassAttribute.name = 'class';
          localClassAttribute.value = transformPart(localClassAttribute.value);

          break;
        }
      }
    },

    HashPair(node) {
      if (node.key !== 'local-class') {
        return;
      }

      node.key = 'class';
      node.value = AST.builders.sexpr('local-class', [
        AST.builders.path(`this.${data.__styles__}`),
        transformParam(node.value),
      ]);
    },
  });

  return AST.print(ast);
}

function updateTemplate(entityName, { customizations, options }) {
  const { getFilePath } = customizations;
  const { __styles__, projectRoot } = options;

  const filePath = getFilePath(entityName);

  const data = {
    __styles__,
  };

  try {
    let file = readFileSync(join(projectRoot, filePath), 'utf8');
    file = sanitizeClassAndLocalClassAttributes(file);
    file = mergeClassAndLocalClassAttributes(file, data);
    file = removeLocalClassHelpers(file, data);
    file = removeLocalClassAttributes(file, data);

    const fileMap = new Map([[filePath, file]]);

    createFiles(fileMap, options);
  } catch (error) {
    console.warn(
      `WARNING: updateTemplate could not update \`${filePath}\`. Please update the file manually. (${error.message})\n`,
    );
  }
}

export function updateTemplates(entities, { customizations, options }) {
  for (const [entityName, extensions] of entities) {
    const hasTemplate = extensions.has('.hbs');

    if (!hasTemplate) {
      continue;
    }

    updateTemplate(entityName, { customizations, options });
  }
}
