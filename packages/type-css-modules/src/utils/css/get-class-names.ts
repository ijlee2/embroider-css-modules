import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options } from '../../types/index.js';
import { ASTCSS as AST } from '../abstract-syntax-tree.js';

export function getClassNames(filePath: string, options: Options): string[] {
  const { projectRoot } = options;
  const file = readFileSync(join(projectRoot, filePath), 'utf8');

  const classNames = new Set<string>();

  AST.traverse(file, {
    ClassSelector(node: { name: string }) {
      classNames.add(node.name);
    },

    PseudoClassSelector(node: { name: string }) {
      if (node.name === 'local') {
        console.warn(
          `WARNING: type-css-modules assumes that all user-defined classes are local. Consider removing the pseudo-class :local() in \`${filePath}\`.\n`,
        );
      }
    },
  });

  return Array.from(classNames).sort();
}
