import { findFiles, removeFiles, unionize } from '@codemod-utils/files';

import { getCssDeclarationFilePaths } from '../utils/css.js';

export function cleanDeclarationFiles(options) {
  const { projectRoot } = options;

  const files = getCssDeclarationFilePaths(options);

  const filePaths = findFiles(unionize(files), {
    cwd: projectRoot,
  });

  removeFiles(filePaths, options);
}
