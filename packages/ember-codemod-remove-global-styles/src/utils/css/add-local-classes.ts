import { AST } from '@codemod-utils/ast-template';

import type { ClassToStyles } from '../../types/index.js';

type ConcatStatement = ReturnType<typeof AST.builders.concat>;
type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type PathExpression = ReturnType<typeof AST.builders.path>;
type StringLiteral = ReturnType<typeof AST.builders.string>;
type TextNode = ReturnType<typeof AST.builders.text>;

type Data = {
  classToStyles: ClassToStyles;
};

export function addLocalClasses(file: string, data: Data): string {
  function isLocal(className: string): boolean {
    return data.classToStyles.has(className);
  }

  function processConcatStatement(nodeValue: ConcatStatement): ConcatStatement {
    const parts = nodeValue.parts
      .map((part) => {
        switch (part.type) {
          case 'MustacheStatement': {
            return [processMustacheStatement(part), AST.builders.text(' ')];
          }

          case 'TextNode': {
            return [processTextNode(part), AST.builders.text(' ')];
          }

          default: {
            return part;
          }
        }
      })
      .flat();

    return AST.builders.concat(parts);
  }

  function processMustacheStatement(
    nodeValue: MustacheStatement,
  ): MustacheStatement {
    switch (nodeValue.path.type) {
      case 'PathExpression': {
        switch (nodeValue.path.original) {
          case 'if':
          case 'unless': {
            if (nodeValue.params[1]?.type === 'StringLiteral') {
              // @ts-expect-error: Incorrect type
              nodeValue.params[1] = processStringLiteral(nodeValue.params[1]);
            }

            if (nodeValue.params[2]?.type === 'StringLiteral') {
              // @ts-expect-error: Incorrect type
              nodeValue.params[2] = processStringLiteral(nodeValue.params[2]);
            }

            break;
          }
        }

        break;
      }

      case 'StringLiteral': {
        // @ts-expect-error: Incorrect type
        nodeValue.path = processStringLiteral(nodeValue.path);
        break;
      }
    }

    return nodeValue;
  }

  function processStringLiteral(
    nodeValue: StringLiteral,
  ): PathExpression | StringLiteral | TextNode {
    const classNames = nodeValue.original.split(/\s+/).filter(Boolean);

    if (classNames.length === 0) {
      return AST.builders.text('');
    }

    if (classNames.length === 1) {
      const className = classNames[0]!;

      return isLocal(className)
        ? AST.builders.path(`styles.${className}`)
        : nodeValue;
    }

    const hasLocalClass = classNames.some(isLocal);

    if (!hasLocalClass) {
      return nodeValue;
    }

    const parts = classNames
      .map((className) => {
        return isLocal(className)
          ? [AST.builders.path(`styles.${className}`), AST.builders.string(' ')]
          : [AST.builders.string(`${className} `), AST.builders.string(' ')];
      })
      .flat();

    // Remove space at the end
    parts.splice(-1);

    return AST.builders.sexpr(AST.builders.path('concat'), parts);
  }

  function processTextNode(nodeValue: TextNode): MustacheStatement | TextNode {
    const classNames = nodeValue.chars.split(/\s+/).filter(Boolean);

    if (classNames.length === 0) {
      return AST.builders.text('');
    }

    if (classNames.length === 1) {
      const className = classNames[0]!;

      return isLocal(className)
        ? AST.builders.mustache(`styles.${className}`)
        : nodeValue;
    }

    const hasLocalClass = classNames.some(isLocal);

    if (!hasLocalClass) {
      return nodeValue;
    }

    const parts = classNames
      .map((className) => {
        return isLocal(className)
          ? [AST.builders.path(`styles.${className}`), AST.builders.string(' ')]
          : [AST.builders.string(className), AST.builders.string(' ')];
      })
      .flat();

    // Remove space at the end
    parts.splice(-1);

    return AST.builders.mustache(AST.builders.path('concat'), parts);
  }

  const traverse = AST.traverse();

  const ast = traverse(file, {
    AttrNode(node) {
      if (node.name !== 'class') {
        return;
      }

      switch (node.value.type) {
        case 'ConcatStatement': {
          node.value = processConcatStatement(node.value);

          break;
        }

        case 'MustacheStatement': {
          node.value = processMustacheStatement(node.value);
          break;
        }

        case 'TextNode': {
          node.value = processTextNode(node.value);
          break;
        }
      }
    },
  });

  return AST.print(ast);
}
