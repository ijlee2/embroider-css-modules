import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { ASTCSS as AST } from '../abstract-syntax-tree.js';

export function getClassNames(filePath, options) {
  const { projectRoot } = options;
  const file = readFileSync(join(projectRoot, filePath), 'utf8');

  const classNames = new Set();

  AST.traverse(file, {
    ClassSelector(node) {
      classNames.add(node.name);
    },

    PseudoClassSelector(node) {
      if (node.name === 'local') {
        console.warn(
          `WARNING: type-css-modules assumes that all user-defined classes are local. Consider removing the pseudo-class :local() in \`${filePath}\`.\n`,
        );
      }
    },
  });

  return [...classNames].sort();
}
