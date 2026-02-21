import { AST } from '@codemod-utils/ast-template';

import type { ClassToStyles } from '../../../types/index.js';

type ConcatStatement = ReturnType<typeof AST.builders.concat>;
type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type PathExpression = ReturnType<typeof AST.builders.path>;
type StringLiteral = ReturnType<typeof AST.builders.string>;
type SubExpression = ReturnType<typeof AST.builders.sexpr>;
type TextNode = ReturnType<typeof AST.builders.text>;

type ProcessorArgs = {
  classToStyles: ClassToStyles;
  isHbs: boolean;
};

export class Processor {
  private args: ProcessorArgs;

  constructor(args: ProcessorArgs) {
    this.args = args;
  }

  private getLocalClass(className: string): string {
    return `${this.getStyles()}.${className}`;
  }

  private getStyles(): 'this.styles' | 'styles' {
    return this.args.isHbs ? 'this.styles' : 'styles';
  }

  private isLocal(className: string): boolean {
    return this.args.classToStyles.has(className);
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
        ? AST.builders.path(this.getLocalClass(className))
        : nodeValue;
    }

    const allGlobal = classNames.every((className) => !this.isLocal(className));

    if (allGlobal) {
      return nodeValue;
    }

    const allLocal = classNames.every(this.isLocal.bind(this));

    if (allLocal) {
      const parts = [
        AST.builders.path(this.getStyles()),
        ...classNames.map((className) => AST.builders.string(className)),
      ];

      return AST.builders.sexpr(AST.builders.path('local'), parts);
    }

    const parts: (PathExpression | StringLiteral)[] = [];
    const globalClassNames: string[] = [];

    classNames.forEach((className) => {
      if (!this.isLocal(className)) {
        globalClassNames.push(className);
        return;
      }

      if (globalClassNames.length > 0) {
        parts.push(AST.builders.string(globalClassNames.join(' ')));
        parts.push(AST.builders.string(' '));
      }

      parts.push(AST.builders.path(this.getLocalClass(className)));
      parts.push(AST.builders.string(' '));
      globalClassNames.length = 0;
    });

    if (globalClassNames.length > 0) {
      parts.push(AST.builders.string(globalClassNames.join(' ')));
      parts.push(AST.builders.string(' '));
    }

    // Remove space at the end
    parts.splice(-1);

    return AST.builders.sexpr(AST.builders.path('concat'), parts);
  }

  processSubExpression(nodeValue: SubExpression): SubExpression {
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

  processTextNode(nodeValue: TextNode): MustacheStatement | TextNode {
    const classNames = nodeValue.chars.split(/\s+/).filter(Boolean);

    if (classNames.length === 0) {
      return AST.builders.text('');
    }

    if (classNames.length === 1) {
      const className = classNames[0]!;

      return this.isLocal(className)
        ? AST.builders.mustache(this.getLocalClass(className))
        : nodeValue;
    }

    const allGlobal = classNames.every((className) => !this.isLocal(className));

    if (allGlobal) {
      return nodeValue;
    }

    const allLocal = classNames.every(this.isLocal.bind(this));

    if (allLocal) {
      const parts = [
        AST.builders.path(this.getStyles()),
        ...classNames.map((className) => AST.builders.string(className)),
      ];

      return AST.builders.mustache(AST.builders.path('local'), parts);
    }

    const parts: (PathExpression | StringLiteral)[] = [];
    const globalClassNames: string[] = [];

    classNames.forEach((className) => {
      if (!this.isLocal(className)) {
        globalClassNames.push(className);
        return;
      }

      if (globalClassNames.length > 0) {
        parts.push(AST.builders.string(globalClassNames.join(' ')));
        parts.push(AST.builders.string(' '));
      }

      parts.push(AST.builders.path(this.getLocalClass(className)));
      parts.push(AST.builders.string(' '));
      globalClassNames.length = 0;
    });

    if (globalClassNames.length > 0) {
      parts.push(AST.builders.string(globalClassNames.join(' ')));
      parts.push(AST.builders.string(' '));
    }

    // Remove space at the end
    parts.splice(-1);

    return AST.builders.mustache(AST.builders.path('concat'), parts);
  }
}
