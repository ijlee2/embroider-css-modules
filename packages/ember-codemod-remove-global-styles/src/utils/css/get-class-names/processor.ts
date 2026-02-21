import type { AST } from '@codemod-utils/ast-template';

function extractClassNames(value: string): string[] {
  return value.split(/\s+/).filter(Boolean);
}

type ConcatStatement = ReturnType<typeof AST.builders.concat>;
type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type StringLiteral = ReturnType<typeof AST.builders.string>;
type SubExpression = ReturnType<typeof AST.builders.sexpr>;
type TextNode = ReturnType<typeof AST.builders.text>;

export type ProcessorReturn = {
  classNames: string[];
  errors: string[];
};

export class Processor {
  private classNames = new Set<string>();
  private errors: string[] = [];

  print(): ProcessorReturn {
    const { classNames, errors } = this;

    return {
      classNames: Array.from(classNames),
      errors,
    };
  }

  processConcatStatement(nodeValue: ConcatStatement): void {
    nodeValue.parts.forEach((part) => {
      switch (part.type) {
        case 'MustacheStatement': {
          this.processMustacheStatement(part);
          break;
        }

        case 'TextNode': {
          this.processTextNode(part);
          break;
        }
      }
    });
  }

  processMustacheStatement(nodeValue: MustacheStatement): void {
    switch (nodeValue.path.type) {
      case 'PathExpression': {
        switch (nodeValue.path.original) {
          case 'if':
          case 'unless': {
            if (nodeValue.params[1]?.type === 'StringLiteral') {
              this.processStringLiteral(nodeValue.params[1]);
            }

            if (nodeValue.params[2]?.type === 'StringLiteral') {
              this.processStringLiteral(nodeValue.params[2]);
            }

            break;
          }

          default: {
            const isLocalClass = nodeValue.path.original.startsWith('styles.');

            if (!isLocalClass) {
              this.errors.push(
                `Could not analyze {{${nodeValue.path.original}}} in template, line ${nodeValue.loc.start.line}.`,
              );
            }
          }
        }

        break;
      }

      case 'StringLiteral': {
        this.processStringLiteral(nodeValue.path);
        break;
      }
    }
  }

  processStringLiteral(nodeValue: StringLiteral): void {
    const classNames = extractClassNames(nodeValue.original);

    classNames.forEach((className) => {
      this.classNames.add(className);
    });
  }

  processSubExpression(nodeValue: SubExpression): void {
    switch (nodeValue.path.type) {
      case 'PathExpression': {
        switch (nodeValue.path.original) {
          case 'if':
          case 'unless': {
            if (nodeValue.params[1]?.type === 'StringLiteral') {
              this.processStringLiteral(nodeValue.params[1]);
            }

            if (nodeValue.params[2]?.type === 'StringLiteral') {
              this.processStringLiteral(nodeValue.params[2]);
            }

            break;
          }

          default: {
            const isLocalClass = nodeValue.path.original.startsWith('styles.');

            if (!isLocalClass) {
              this.errors.push(
                `Could not analyze {{${nodeValue.path.original}}} in template, line ${nodeValue.loc.start.line}.`,
              );
            }
          }
        }

        break;
      }

      case 'StringLiteral': {
        this.processStringLiteral(nodeValue.path);
        break;
      }
    }
  }

  processTextNode(nodeValue: TextNode): void {
    const classNames = extractClassNames(nodeValue.chars);

    classNames.forEach((className) => {
      this.classNames.add(className);
    });
  }
}
