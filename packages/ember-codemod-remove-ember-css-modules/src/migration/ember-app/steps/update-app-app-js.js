import { readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { createFiles, findFiles } from '@codemod-utils/files';

import { ASTJavaScript as AST } from '../../../utils/abstract-syntax-tree.js';

function addCssEntryPoint(file, data) {
  const traverse = AST.traverse(data.hasTypeScript);

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

export function updateAppAppJs(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/app.{js,ts}', {
    cwd: projectRoot,
  });

  if (filePaths.length !== 1) {
    console.warn(
      'WARNING: updateAppAppJs could not find app.{js,ts} in the app folder. Will skip this step.\n',
    );

    return;
  }

  const filePath = filePaths[0];

  const fileExtension = extname(filePath);
  const hasTypeScript = fileExtension === '.ts';

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  try {
    file = addCssEntryPoint(file, {
      hasTypeScript,
    });

    const fileMapping = new Map([[filePath, file]]);

    createFiles(fileMapping, options);
  } catch (e) {
    console.warn(
      `WARNING: updateAppAppJs could not update \`${filePath}\`. Please update the file manually. (${e.message})\n`,
    );
  }
}
