import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { parse, walk } from 'css-tree';

export function getClassNames(filePath, options) {
  const { projectRoot } = options;
  const cssFile = readFileSync(join(projectRoot, filePath), 'utf8');

  const ast = parse(cssFile);
  const classNames = new Set();

  walk(ast, (node) => {
    switch (node.type) {
      case 'ClassSelector': {
        classNames.add(node.name);

        break;
      }

      case 'PseudoClassSelector': {
        if (node.name === 'local') {
          console.warn(
            `WARNING: type-css-modules assumes that all user-defined classes are local. Consider removing the pseudo-class :local() in \`${filePath}\`.\n`
          );
        }

        break;
      }
    }
  });

  return [...classNames].sort();
}
