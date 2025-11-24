import { AST } from '@codemod-utils/ast-template';

import type { ClassToStyles } from '../../types/index.js';
import { Processor } from './add-local-classes/index.js';

type Data = {
  classToStyles: ClassToStyles;
  isHbs: boolean;
};

export function addLocalClasses(file: string, data: Data): string {
  const processor = new Processor(data);
  const traverse = AST.traverse();

  const ast = traverse(file, {
    AttrNode(node) {
      if (node.name !== 'class') {
        return;
      }

      switch (node.value.type) {
        case 'ConcatStatement': {
          node.value = processor.processConcatStatement(node.value);
          break;
        }

        case 'MustacheStatement': {
          node.value = processor.processMustacheStatement(node.value);
          break;
        }

        case 'TextNode': {
          node.value = processor.processTextNode(node.value);
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
          // @ts-expect-error: Incorrect type
          node.value = processor.processStringLiteral(node.value);
          break;
        }

        case 'SubExpression': {
          node.value = processor.processSubExpression(node.value);
          break;
        }
      }
    },
  });

  return AST.print(ast);
}
