import { AST } from '@codemod-utils/ast-template';

import type { ClassToStyles } from '../../../types/index.js';

type ConcatStatement = ReturnType<typeof AST.builders.concat>;
type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type PathExpression = ReturnType<typeof AST.builders.path>;
type StringLiteral = ReturnType<typeof AST.builders.string>;
type TextNode = ReturnType<typeof AST.builders.text>;

type ProcessorArgs = {
  classToStyles: ClassToStyles;
};

export type ProcessorReturn = {
  classes: string[];
  errors: string[];
};

export class Processor {
  private classToStyles: ClassToStyles;

  constructor(args: ProcessorArgs) {
    this.classToStyles = args.classToStyles;
  }

  private isLocal(className: string): boolean {
    return this.classToStyles.has(className);
  }

  processConcatStatement(nodeValue: ConcatStatement): ConcatStatement {
    const parts = nodeValue.parts
      .map((part) => {
        switch (part.type) {
          case 'MustacheStatement': {
            return [
              this.processMustacheStatement(part),
              AST.builders.text(' '),
            ];
          }

          case 'TextNode': {
            return [this.processTextNode(part), AST.builders.text(' ')];
          }

          default: {
            return part;
          }
        }
      })
      .flat();

    return AST.builders.concat(parts);
  }

  processMustacheStatement(nodeValue: MustacheStatement): MustacheStatement {
    switch (nodeValue.path.type) {
      case 'PathExpression': {
        switch (nodeValue.path.original) {
          case 'if':
          case 'unless': {
            if (nodeValue.params[1]?.type === 'StringLiteral') {
              // @ts-expect-error: Incorrect type
              nodeValue.params[1] = this.processStringLiteral(
                nodeValue.params[1],
              );
            }

            if (nodeValue.params[2]?.type === 'StringLiteral') {
              // @ts-expect-error: Incorrect type
              nodeValue.params[2] = this.processStringLiteral(
                nodeValue.params[2],
              );
            }

            break;
          }
        }

        break;
      }

      case 'StringLiteral': {
        // @ts-expect-error: Incorrect type
        nodeValue.path = this.processStringLiteral(nodeValue.path);
        break;
      }
    }

    return nodeValue;
  }

  processStringLiteral(
    nodeValue: StringLiteral,
  ): PathExpression | StringLiteral | TextNode {
    const classNames = nodeValue.original.split(/\s+/).filter(Boolean);

    if (classNames.length === 0) {
      return AST.builders.text('');
    }

    if (classNames.length === 1) {
      const className = classNames[0]!;

      return this.isLocal(className)
        ? AST.builders.path(`styles.${className}`)
        : nodeValue;
    }

    const hasLocalClass = classNames.some(this.isLocal.bind(this));

    if (!hasLocalClass) {
      return nodeValue;
    }

    const parts = classNames
      .map((className) => {
        return this.isLocal(className)
          ? [AST.builders.path(`styles.${className}`), AST.builders.string(' ')]
          : [AST.builders.string(`${className} `), AST.builders.string(' ')];
      })
      .flat();

    // Remove space at the end
    parts.splice(-1);

    return AST.builders.sexpr(AST.builders.path('concat'), parts);
  }

  processTextNode(nodeValue: TextNode): MustacheStatement | TextNode {
    const classNames = nodeValue.chars.split(/\s+/).filter(Boolean);

    if (classNames.length === 0) {
      return AST.builders.text('');
    }

    if (classNames.length === 1) {
      const className = classNames[0]!;

      return this.isLocal(className)
        ? AST.builders.mustache(`styles.${className}`)
        : nodeValue;
    }

    const hasLocalClass = classNames.some(this.isLocal.bind(this));

    if (!hasLocalClass) {
      return nodeValue;
    }

    const parts = classNames
      .map((className) => {
        return this.isLocal(className)
          ? [AST.builders.path(`styles.${className}`), AST.builders.string(' ')]
          : [AST.builders.string(className), AST.builders.string(' ')];
      })
      .flat();

    // Remove space at the end
    parts.splice(-1);

    return AST.builders.mustache(AST.builders.path('concat'), parts);
  }
}
