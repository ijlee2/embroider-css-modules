import { AST } from '@codemod-utils/ast-template';

type MustacheStatement = ReturnType<typeof AST.builders.mustache>;
type StringLiteral = ReturnType<typeof AST.builders.string>;
type TextNode = ReturnType<typeof AST.builders.text>;

export function getClasses(file: string): {
  classes: string[];
  errors: string[];
} {
  const classes = new Set<string>();
  const errors: string[] = [];

  function processMustacheStatement(nodeValue: MustacheStatement): void {
    switch (nodeValue.path.type) {
      case 'PathExpression': {
        switch (nodeValue.path.original) {
          case 'if':
          case 'unless': {
            if (nodeValue.params[1]?.type === 'StringLiteral') {
              processStringLiteral(nodeValue.params[1]);
            }

            if (nodeValue.params[2]?.type === 'StringLiteral') {
              processStringLiteral(nodeValue.params[2]);
            }

            break;
          }

          default: {
            const isLocalClass = nodeValue.path.original.startsWith('styles.');

            if (!isLocalClass) {
              errors.push(
                `Could not analyze {{${nodeValue.path.original}}} in template, line ${nodeValue.loc.start.line}.`,
              );
            }
          }
        }

        break;
      }

      case 'StringLiteral': {
        processStringLiteral(nodeValue.path);
        break;
      }
    }
  }

  function processStringLiteral(nodeValue: StringLiteral): void {
    const classNames = nodeValue.original.split(/\s+/).filter(Boolean);

    classNames.forEach((className) => {
      classes.add(className);
    });
  }

  function processTextNode(nodeValue: TextNode): void {
    const classNames = nodeValue.chars.split(/\s+/).filter(Boolean);

    classNames.forEach((className) => {
      classes.add(className);
    });
  }

  const traverse = AST.traverse();

  traverse(file, {
    AttrNode(node) {
      if (node.name !== 'class') {
        return;
      }

      switch (node.value.type) {
        case 'ConcatStatement': {
          node.value.parts.forEach((part) => {
            switch (part.type) {
              case 'MustacheStatement': {
                processMustacheStatement(part);
                break;
              }

              case 'TextNode': {
                processTextNode(part);
                break;
              }
            }
          });

          break;
        }

        case 'MustacheStatement': {
          processMustacheStatement(node.value);
          break;
        }

        case 'TextNode': {
          processTextNode(node.value);
          break;
        }
      }
    },
  });

  return {
    classes: Array.from(classes),
    errors,
  };
}
