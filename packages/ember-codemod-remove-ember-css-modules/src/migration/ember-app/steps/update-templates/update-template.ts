/* eslint-disable @typescript-eslint/ban-ts-comment */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-template';
import { createFiles } from '@codemod-utils/files';

import type { OptionsForUpdateTemplates } from '../../../../types/index.js';

function sanitizeClassAndLocalClassAttributes(file: string): string {
  function removeAttributeWithoutValue(
    attributeName: string,
    attributes: unknown[],
  ): void {
    const attributeIndex = attributes.findIndex(
      // @ts-ignore: Assume that types from external packages are correct
      (attribute) => attribute.name === attributeName,
    );

    if (attributeIndex === -1) {
      return;
    }

    const attribute = attributes[attributeIndex]!;

    // @ts-ignore: Assume that types from external packages are correct
    if (attribute.isValueless) {
      attributes.splice(attributeIndex, 1);
      return;
    }

    // @ts-ignore: Assume that types from external packages are correct
    if (attribute.value.type !== 'TextNode') {
      return;
    }

    // @ts-ignore: Assume that types from external packages are correct
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

function mergeClassAndLocalClassAttributes(file: string): string {
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
      const localClassAttribute = attributes[localClassAttributeIndex]!;
      const classAttribute = attributes[classAttributeIndex]!;

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
          AST.builders.path(`this.styles.${localClassNames[0]!}`),
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

      attributes[classAttributeIndex]!.value = AST.builders.mustache(
        AST.builders.path('concat'),
        params,
      );

      // Remove the local-class attribute
      attributes.splice(localClassAttributeIndex, 1);
    },
  });

  return AST.print(ast);
}

function removeLocalClassHelpers(file: string): string {
  /*
    The {{local-class}} helper from ember-css-modules allows
    1 positional argument. The argument's value is presumed
    to be a concatenated string or `undefined`.
  */
  function canRemoveLocalClassHelper(path: unknown) {
    // @ts-ignore: Assume that types from external packages are correct
    const hasFromArgument = path.hash.pairs.some((pair) => pair.key === 'from');

    if (hasFromArgument) {
      throw new RangeError(
        // @ts-ignore: Assume that types from external packages are correct
        `Unable to handle the {{local-class}} helper's \`from\` key. See lines ${path.loc.start.line}-${path.loc.end.line}.`,
      );
    }

    // @ts-ignore: Assume that types from external packages are correct
    const param = path.params[0]!;

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
    // @ts-ignore: Assume that types from external packages are correct
    AttrNode(node) {
      if (node.name !== 'class') {
        return;
      }

      const hasLocalClassHelper =
        node.value.type === 'MustacheStatement' &&
        // @ts-ignore: Assume that types from external packages are correct
        node.value.path.original === 'local-class';

      if (!hasLocalClassHelper) {
        return;
      }

      if (canRemoveLocalClassHelper(node.value)) {
        return null;
      }

      // @ts-ignore: Assume that types from external packages are correct
      const param = node.value.params[0]!;

      if (param.type !== 'StringLiteral') {
        return;
      }

      const localClassNames = param.value.trim().split(/\s+/);

      if (localClassNames.length === 1) {
        node.value = AST.builders.mustache(
          AST.builders.path(`this.styles.${localClassNames[0]!}`),
        );

        return;
      }

      node.value = AST.builders.mustache(AST.builders.path('local-class'), [
        AST.builders.path('this.styles'),
        ...localClassNames.map(AST.builders.string),
      ]);
    },

    SubExpression(node) {
      // @ts-ignore: Assume that types from external packages are correct
      const hasLocalClassHelper = node.path.original === 'local-class';

      if (!hasLocalClassHelper) {
        return;
      }

      if (canRemoveLocalClassHelper(node)) {
        return AST.builders.string('');
      }

      const param = node.params[0]!;

      if (param.type !== 'StringLiteral') {
        return node;
      }

      const localClassNames = param.value.trim().split(/\s+/);

      if (localClassNames.length === 1) {
        return AST.builders.path(`this.styles.${localClassNames[0]!}`);
      }

      return AST.builders.sexpr(AST.builders.path('local-class'), [
        AST.builders.path('this.styles'),
        ...localClassNames.map(AST.builders.string),
      ]);
    },
  });

  return AST.print(ast);
}

function removeLocalClassAttributes(file: string): string {
  function transformParam(param: unknown) {
    // @ts-ignore: Assume that types from external packages are correct
    switch (param.type) {
      case 'StringLiteral': {
        // @ts-ignore: Assume that types from external packages are correct
        const localClassNames = param.value.trim().split(/\s+/);

        if (localClassNames.length === 1) {
          // @ts-ignore: Assume that types from external packages are correct
          param.value = localClassNames[0]!;
        } else {
          param = AST.builders.sexpr(
            'array',
            localClassNames.map(AST.builders.string),
          );
        }

        break;
      }

      case 'SubExpression': {
        // @ts-ignore: Assume that types from external packages are correct
        switch (param.path.original) {
          case 'if':
          case 'unless': {
            // @ts-ignore: Assume that types from external packages are correct
            const subparams = param.params.map(transformParam);

            // @ts-ignore: Assume that types from external packages are correct
            param = AST.builders.sexpr(param.path.original, subparams);

            break;
          }
        }

        break;
      }
    }

    return param;
  }

  // @ts-ignore: Assume that types from external packages are correct
  function transformPart(part: unknown) {
    // @ts-ignore: Assume that types from external packages are correct
    switch (part.type) {
      case 'MustacheStatement': {
        // @ts-ignore: Assume that types from external packages are correct
        switch (part.path.original) {
          case 'concat': {
            // eslint-disable-next-line no-inner-declarations
            function hasPathExpression(params: unknown[]) {
              // @ts-ignore: Assume that types from external packages are correct
              return params.some((param) => param.type === 'PathExpression');
            }

            // @ts-ignore: Assume that types from external packages are correct
            if (hasPathExpression(part.params)) {
              return AST.builders.mustache(AST.builders.path('get'), [
                AST.builders.path('this.styles'),
                // @ts-ignore: Assume that types from external packages are correct
                AST.builders.sexpr(part.path.original, part.params),
              ]);
            }

            // @ts-ignore: Assume that types from external packages are correct
            const params = part.params.map(transformParam);

            return AST.builders.mustache('local-class', [
              AST.builders.path('this.styles'),
              ...params,
            ]);
          }

          case 'if':
          case 'unless': {
            // @ts-ignore: Assume that types from external packages are correct
            const params = part.params.map(transformParam);

            return AST.builders.mustache('local-class', [
              AST.builders.path('this.styles'),
              // @ts-ignore: Assume that types from external packages are correct
              AST.builders.sexpr(part.path.original, params),
            ]);
          }

          default: {
            return AST.builders.mustache(AST.builders.path('get'), [
              AST.builders.path('this.styles'),
              // @ts-ignore: Assume that types from external packages are correct
              part.path,
            ]);
          }
        }
      }

      case 'TextNode': {
        // @ts-ignore: Assume that types from external packages are correct
        const value = part.chars.trim();

        if (value === '') {
          return part;
        }

        const localClassNames = value.split(/\s+/);

        if (localClassNames.length === 1) {
          return AST.builders.mustache(
            AST.builders.path(`this.styles.${localClassNames[0]!}`),
          );
        }

        return AST.builders.mustache(AST.builders.path('local-class'), [
          AST.builders.path('this.styles'),
          ...localClassNames.map(AST.builders.string),
        ]);
      }
    }
  }

  function transformParts(parts: unknown[]) {
    const numParts = parts.length;

    return parts.reduce((accumulator, part, index) => {
      // @ts-ignore: Assume that types from external packages are correct
      accumulator.push(transformPart(part));

      if (index < numParts - 1) {
        // @ts-ignore: Assume that types from external packages are correct
        accumulator.push(AST.builders.text(' '));
      }

      return accumulator;
    }, [] as unknown[]);
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
      const localClassAttribute = attributes[localClassAttributeIndex]!;

      switch (localClassAttribute.value.type) {
        case 'ConcatStatement': {
          localClassAttribute.name = 'class';
          // @ts-ignore: Assume that types from external packages are correct
          localClassAttribute.value.parts = transformParts(
            localClassAttribute.value.parts,
          );

          break;
        }

        case 'MustacheStatement': {
          localClassAttribute.name = 'class';
          // @ts-ignore: Assume that types from external packages are correct
          localClassAttribute.value = transformPart(localClassAttribute.value);

          break;
        }

        case 'TextNode': {
          localClassAttribute.name = 'class';
          // @ts-ignore: Assume that types from external packages are correct
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

      const newValue = transformParam(node.value);

      // @ts-ignore: Assume that types from external packages are correct
      if (newValue.type === 'StringLiteral') {
        node.value = AST.builders.path(
          // @ts-ignore: Assume that types from external packages are correct
          `this.styles.${newValue.value}`,
        );

        return;
      }

      node.value = AST.builders.sexpr('local-class', [
        AST.builders.path('this.styles'),
        // @ts-ignore: Assume that types from external packages are correct
        newValue,
      ]);
    },
  });

  return AST.print(ast);
}

export function updateTemplate(
  entityName: string,
  { customizations, options }: OptionsForUpdateTemplates,
): void {
  const { getFilePath } = customizations;
  const { projectRoot } = options;

  const filePath = getFilePath(entityName);

  try {
    let file = readFileSync(join(projectRoot, filePath), 'utf8');
    file = sanitizeClassAndLocalClassAttributes(file);
    file = mergeClassAndLocalClassAttributes(file);
    file = removeLocalClassHelpers(file);
    file = removeLocalClassAttributes(file);

    const fileMap = new Map([[filePath, file]]);

    createFiles(fileMap, options);
  } catch (error) {
    let message = `WARNING: updateTemplate could not update \`${filePath}\`. Please update the file manually.`;

    if (error instanceof Error) {
      message += ` (${error.message})`;
    }

    console.warn(`${message}\n`);
  }
}
