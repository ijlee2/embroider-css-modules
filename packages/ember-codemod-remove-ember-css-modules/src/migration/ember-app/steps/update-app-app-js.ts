import { readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { createFiles, findFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

type Data = {
  isTypeScript: boolean;
};

function addCssEntryPoint(file: string, data: Data): string {
  const traverse = AST.traverse(data.isTypeScript);

  const ast = traverse(file, {
    visitProgram(path) {
      const nodesToAdd = [
        AST.builders.importDeclaration(
          [],
          AST.builders.literal('./assets/app.css'),
        ),
        AST.builders.noop(),
      ];

      path.value.body.unshift(...nodesToAdd);

      return false;
    },
  });

  return AST.print(ast);
}

export function updateAppAppJs(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('app/app.{js,ts}', {
    projectRoot,
  });

  if (filePaths.length !== 1) {
    console.warn(
      'WARNING: updateAppAppJs could not find app.{js,ts} in the app folder. Will skip this step.\n',
    );

    return;
  }

  const filePath = filePaths[0]!;
  const fileExtension = extname(filePath);

  const data = {
    isTypeScript: fileExtension === '.ts',
  };

  try {
    let file = readFileSync(join(projectRoot, filePath), 'utf8');
    file = addCssEntryPoint(file, data);

    const fileMap = new Map([[filePath, file]]);

    createFiles(fileMap, options);
  } catch (error) {
    let message = `WARNING: updateAppAppJs could not update \`${filePath}\`. Please update the file manually.`;

    if (error instanceof Error) {
      message += ` (${error.message})`;
    }

    console.warn(`${message}\n`);
  }
}
