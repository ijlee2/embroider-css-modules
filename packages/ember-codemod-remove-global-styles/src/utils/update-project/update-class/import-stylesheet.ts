import { EOL } from 'node:os';

import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  fileName: string;
};

export function importStylesheet(file: string, data: Data): string {
  let canSkip = false;

  AST.traverse(file, {
    visitImportDeclaration(path) {
      const importPath = path.node.source.value;

      if (
        importPath === `./${data.fileName}.css` ||
        importPath === `./${data.fileName}.module.css`
      ) {
        canSkip = true;
      }

      return false;
    },
  });

  return canSkip
    ? file
    : [`import styles from './${data.fileName}.module.css';`, file].join(EOL);
}
