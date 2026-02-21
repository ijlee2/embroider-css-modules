import { AST } from '@codemod-utils/ast-template';

type ConcatStatement = ReturnType<typeof AST.builders.concat>;
type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type StringLiteral = ReturnType<typeof AST.builders.string>;
type SubExpression = ReturnType<typeof AST.builders.sexpr>;
type TextNode = ReturnType<typeof AST.builders.text>;

function extractClassNames(value: string): string[] {
  return value.split(/\s+/).filter(Boolean);
}

type ProcessorPrint = {
  classNames: string[];
  errors: string[];
};

class Processor {
  private classNames = new Set<string>();
  private errors: string[] = [];

  print(): ProcessorPrint {
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

export function getClassNames(file: string): ProcessorPrint {
  const processor = new Processor();
  const traverse = AST.traverse();

  traverse(file, {
    AttrNode(node) {
      if (node.name !== 'class') {
        return;
      }

      switch (node.value.type) {
        case 'ConcatStatement': {
          processor.processConcatStatement(node.value);
          break;
        }

        case 'MustacheStatement': {
          processor.processMustacheStatement(node.value);
          break;
        }

        case 'TextNode': {
          processor.processTextNode(node.value);
          break;
        }
      }
    },

    HashPair(node) {
      if (node.key !== 'class') {
        return;
      }

      switch (node.value.type) {
        case 'StringLiteral': {
          processor.processStringLiteral(node.value);
          break;
        }

        case 'SubExpression': {
          processor.processSubExpression(node.value);
          break;
        }
      }
    },
  });

  return processor.print();
}
