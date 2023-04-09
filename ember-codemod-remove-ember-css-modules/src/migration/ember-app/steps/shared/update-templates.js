import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ASTHandlebars as AST } from '../../../../utils/abstract-syntax-tree.js';
import { createFiles } from '../../../../utils/files.js';

function sanitizeClassAndLocalClassAttributes(file) {
  function removeAttributeWithoutValue(attributeName, attributes) {
    const attributeIndex = attributes.findIndex(
      (attribute) => attribute.name === attributeName
    );

    if (attributeIndex === -1) {
      return;
    }

    const attribute = attributes[attributeIndex];

    if (attribute.value.type !== 'TextNode') {
      return;
    }

    if (attribute.isValueless) {
      attributes.splice(attributeIndex, 1);
      return;
    }

    const attributeValue = attribute.value.chars.trim();

    if (attributeValue === '') {
      attributes.splice(attributeIndex, 1);
      return;
    }
  }

  const ast = AST.traverse(file, {
    ElementNode(node) {
      const { attributes } = node;

      removeAttributeWithoutValue('class', attributes);
      removeAttributeWithoutValue('local-class', attributes);
    },
  });

  return AST.print(ast);
}

function mergeClassAndLocalClassAttributes(file) {
  const ast = AST.traverse(file, {
    ElementNode(node) {
      // Check if both class and local-class attributes exist
      const { attributes } = node;

      const localClassAttributeIndex = attributes.findIndex(
        (attribute) => attribute.name === 'local-class'
      );
      const classAttributeIndex = attributes.findIndex(
        (attribute) => attribute.name === 'class'
      );

      if (localClassAttributeIndex === -1 || classAttributeIndex === -1) {
        return;
      }

      // For now, assume that both attributes have TextNode values
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
          AST.builders.path(`this.styles.${localClassNames[0]}`),
          AST.builders.string(` ${classAttributeValue}`),
        ];
      } else {
        params = [
          AST.builders.sexpr('local-class', [
            AST.builders.path('this.styles'),
            ...localClassNames.map(AST.builders.string),
          ]),
          AST.builders.string(` ${classAttributeValue}`),
        ];
      }

      attributes[classAttributeIndex].value = AST.builders.mustache(
        AST.builders.path('concat'),
        params
      );

      // Remove the local-class attribute
      attributes.splice(localClassAttributeIndex, 1);
    },
  });

  return AST.print(ast);
}

function removeLocalClassAttributes(file) {
  function transformParam(param) {
    switch (param.type) {
      case 'StringLiteral': {
        const localClassNames = param.value.trim().split(/\s+/);

        if (localClassNames.length === 1) {
          param.value = localClassNames[0];
        } else {
          param = AST.builders.sexpr(
            'array',
            localClassNames.map(AST.builders.string)
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
            const params = part.params.map(transformParam);

            return AST.builders.mustache('local-class', [
              AST.builders.path('this.styles'),
              ...params,
            ]);
          }

          case 'if':
          case 'unless': {
            const params = part.params.map(transformParam);

            return AST.builders.mustache('local-class', [
              AST.builders.path('this.styles'),
              AST.builders.sexpr(part.path.original, params),
            ]);
          }

          default: {
            return AST.builders.mustache(AST.builders.path('get'), [
              AST.builders.path('this.styles'),
              part.path,
            ]);
          }
        }
      }

      case 'TextNode': {
        const localClassNames = part.chars.trim().split(/\s+/);

        if (localClassNames.length === 1) {
          return AST.builders.mustache(
            AST.builders.path(`this.styles.${localClassNames[0]}`)
          );
        }

        return AST.builders.mustache(AST.builders.path('local-class'), [
          AST.builders.path('this.styles'),
          ...localClassNames.map(AST.builders.string),
        ]);
      }
    }
  }

  const ast = AST.traverse(file, {
    ElementNode(node) {
      // Check if the local-class attribute (still) exists
      const { attributes } = node;

      const localClassAttributeIndex = attributes.findIndex(
        (attribute) => attribute.name === 'local-class'
      );

      if (localClassAttributeIndex === -1) {
        return;
      }

      // Change the local-class attribute to class
      const localClassAttribute = attributes[localClassAttributeIndex];

      switch (localClassAttribute.value.type) {
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
  });

  return AST.print(ast);
}

function updateTemplate(customizations, options) {
  const { entityName, getFilePath } = customizations;
  const { projectRoot } = options;

  const filePath = getFilePath(entityName);

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  try {
    file = sanitizeClassAndLocalClassAttributes(file);
    file = mergeClassAndLocalClassAttributes(file);
    file = removeLocalClassAttributes(file);

    const fileMapping = new Map([[filePath, file]]);

    createFiles(fileMapping, options);
  } catch (e) {
    console.warn(
      `WARNING: updateTemplate could not update \`${filePath}\`. Please manually update the file. (${e.message})\n`
    );
  }
}

export function updateTemplates(customizations, options) {
  const { entities, getFilePath } = customizations;

  for (const [entityName, extensions] of entities) {
    const hasTemplate = extensions.has('.hbs');

    if (!hasTemplate) {
      continue;
    }

    updateTemplate({ entityName, getFilePath }, options);
  }
}
