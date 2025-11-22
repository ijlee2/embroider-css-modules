import type { AST } from '@codemod-utils/ast-template';

function extractClasses(value: string): string[] {
  return value.split(/\s+/).filter(Boolean);
}

type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type StringLiteral = ReturnType<typeof AST.builders.string>;
type TextNode = ReturnType<typeof AST.builders.text>;

export type ProcessorReturn = {
  classes: string[];
  errors: string[];
};

export class Processor {
  private classes = new Set<string>();
  private errors: string[] = [];

  print(): ProcessorReturn {
    const { classes, errors } = this;

    return {
      classes: Array.from(classes),
      errors,
    };
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
    const classNames = extractClasses(nodeValue.original);

    classNames.forEach((className) => {
      this.classes.add(className);
    });
  }

  processTextNode(nodeValue: TextNode): void {
    const classNames = extractClasses(nodeValue.chars);

    classNames.forEach((className) => {
      this.classes.add(className);
    });
  }
}
