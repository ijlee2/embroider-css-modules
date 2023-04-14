import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ASTCSS as AST } from '../abstract-syntax-tree.js';

export function getClassNames(filePath, options) {
  const { projectRoot } = options;
  const file = readFileSync(join(projectRoot, filePath), 'utf8');

  const classNames = new Set();

  const ast = AST.traverse(file, {
    Rule(node) {
      console.log(node.selectors);

      const selectors = node.selector.split(/\s+/);

      selectors.forEach((selector) => {
        if (!selector.startsWith('.')) {
          return;
        }

        const classSelector = selector.replace(/^\./, '');

        classNames.add(classSelector);
      });
    },
  });

  AST.print(ast);

  return [...classNames].sort();
}
