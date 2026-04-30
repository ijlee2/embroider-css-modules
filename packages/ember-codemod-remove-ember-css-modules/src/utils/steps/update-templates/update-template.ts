import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-template';
import { createFiles } from '@codemod-utils/files';

import type { OptionsForUpdateTemplates } from '../../../types/index.js';

type AttrNode = ReturnType<typeof AST.builders.attr>;
type ConcatStatement = ReturnType<typeof AST.builders.concat>;
type Expression = MustacheStatement['path'];
type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type SubExpression = ReturnType<typeof AST.builders.sexpr>;
type TextNode = ReturnType<typeof AST.builders.text>;

function sanitizeClassAndLocalClassAttributes(file: string): string {
  function removeAttributeWithoutValue(
    attributeName: string,
    attributes: AttrNode[],
  ): void {
    const attributeIndex = attributes.findIndex((attribute) => {
      return attribute.name === attributeName;
    });

    if (attributeIndex === -1) {
      return;
    }

    const attribute = attributes[attributeIndex]!;

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

function mergeClassAndLocalClassAttributes(file: string): string {
  const traverse = AST.traverse();

  const ast = traverse(file, {
    ElementNode(node) {
      // Check that both class and local-class attributes exist
      const { attributes } = node;

      const localClassAttributeIndex = attributes.findIndex((attribute) => {
        return attribute.name === 'local-class';
      });

      const classAttributeIndex = attributes.findIndex((attribute) => {
        return attribute.name === 'class';
      });

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
          AST.builders.sexpr('local', [
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
  function canRemoveLocalClassHelper(
    path: ConcatStatement | MustacheStatement | SubExpression | TextNode,
  ): boolean {
    // @ts-expect-error: Incorrect type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hasFromArgument = path.hash.pairs.some((pair) => pair.key === 'from');

    if (hasFromArgument) {
      throw new RangeError(
        `Unable to handle the {{local-class}} helper's \`from\` key. See lines ${path.loc.start.line}-${path.loc.end.line}.`,
      );
    }

    // @ts-expect-error: Incorrect type
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const param = path.params[0]!;

    if (param === undefined) {
      return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (param.type !== 'StringLiteral') {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
        node.value.path.type === 'PathExpression' &&
        node.value.path.original === 'local-class';

      if (!hasLocalClassHelper) {
        return;
      }

      if (canRemoveLocalClassHelper(node.value)) {
        return null;
      }

      // @ts-expect-error: Incorrect type
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const param = node.value.params[0]!;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (param.type !== 'StringLiteral') {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const localClassNames = param.value.trim().split(/\s+/);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (localClassNames.length === 1) {
        node.value = AST.builders.mustache(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          AST.builders.path(`this.styles.${localClassNames[0]!}`),
        );

        return;
      }

      node.value = AST.builders.mustache(AST.builders.path('local'), [
        AST.builders.path('this.styles'),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        ...localClassNames.map(AST.builders.string),
      ]);

      return;
    },

    MustacheStatement(node) {
      const hasLocalClassHelper =
        node.path.type === 'PathExpression' &&
        node.path.original === 'local-class';

      if (!hasLocalClassHelper) {
        return;
      }

      const param = node.params[0]!;

      if (param.type !== 'StringLiteral') {
        return;
      }

      const localClassNames = param.value.trim().split(/\s+/);

      if (localClassNames.length === 1) {
        return AST.builders.mustache(
          AST.builders.path(`this.styles.${localClassNames[0]!}`),
        );
      }

      return AST.builders.mustache(AST.builders.path('local'), [
        AST.builders.path('this.styles'),
        ...localClassNames.map(AST.builders.string),
      ]);
    },

    SubExpression(node) {
      const hasLocalClassHelper =
        node.path.type === 'PathExpression' &&
        node.path.original === 'local-class';

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

      return AST.builders.sexpr(AST.builders.path('local'), [
        AST.builders.path('this.styles'),
        ...localClassNames.map(AST.builders.string),
      ]);
    },
  });

  return AST.print(ast);
}

function removeLocalClassAttributes(file: string): string {
  function transformExpression(expression: Expression): Expression {
    switch (expression.type) {
      case 'StringLiteral': {
        const localClassNames = expression.value.trim().split(/\s+/);

        if (localClassNames.length === 1) {
          expression.value = localClassNames[0]!;
        } else {
          expression = AST.builders.sexpr(
            'array',
            localClassNames.map(AST.builders.string),
          );
        }

        break;
      }

      case 'SubExpression': {
        if (expression.path.type !== 'PathExpression') {
          break;
        }

        switch (expression.path.original) {
          case 'if':
          case 'unless': {
            const subparams = expression.params.map(transformExpression);

            expression = AST.builders.sexpr(
              expression.path.original,
              subparams,
            );

            break;
          }
        }

        break;
      }
    }

    return expression;
  }

  function transformPart(
    part: MustacheStatement | TextNode,
  ): MustacheStatement | TextNode {
    switch (part.type) {
      case 'MustacheStatement': {
        if (part.path.type === 'SubExpression') {
          return AST.builders.mustache(AST.builders.path('get'), [
            AST.builders.path('this.styles'),
            part.path,
          ]);
        }

        switch (part.path.original) {
          case 'concat': {
            function hasPathExpression(params: Expression[]): boolean {
              return params.some((param) => param.type === 'PathExpression');
            }

            if (hasPathExpression(part.params)) {
              return AST.builders.mustache(AST.builders.path('get'), [
                AST.builders.path('this.styles'),
                AST.builders.sexpr(part.path.original, part.params),
              ]);
            }

            const params = part.params.map(transformExpression);

            return AST.builders.mustache('local', [
              AST.builders.path('this.styles'),
              ...params,
            ]);
          }

          case 'if':
          case 'unless': {
            const params = part.params.map(transformExpression);

            return AST.builders.mustache('local', [
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

        return AST.builders.mustache(AST.builders.path('local'), [
          AST.builders.path('this.styles'),
          ...localClassNames.map(AST.builders.string),
        ]);
      }
    }
  }

  function transformParts(
    parts: (MustacheStatement | TextNode)[],
  ): (MustacheStatement | TextNode)[] {
    const numParts = parts.length;

    return parts.reduce(
      (accumulator, part, index) => {
        accumulator.push(transformPart(part));

        if (index < numParts - 1) {
          accumulator.push(AST.builders.text(' '));
        }

        return accumulator;
      },
      [] as (MustacheStatement | TextNode)[],
    );
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
          // @ts-expect-error: Incorrect type
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

      const newValue = transformExpression(node.value);

      if (newValue.type === 'StringLiteral') {
        node.value = AST.builders.path(`this.styles.${newValue.value}`);

        return;
      }

      node.value = AST.builders.sexpr('local', [
        AST.builders.path('this.styles'),
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

    console.warn(message);
  }
}
