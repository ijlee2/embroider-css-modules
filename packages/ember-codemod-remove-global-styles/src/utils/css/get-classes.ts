import { AST } from '@codemod-utils/ast-template';

import { Processor, type ProcessorReturn } from './get-classes/index.js';

export function getClasses(file: string): ProcessorReturn {
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
  });

  return processor.print();
}
