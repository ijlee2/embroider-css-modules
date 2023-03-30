import { getCssDeclarationFilePaths } from '../utils/css.js';
import { findFiles, removeFiles, unionize } from '../utils/files.js';

export function cleanDeclarationFiles(options) {
  const { projectRoot } = options;

  const files = getCssDeclarationFilePaths(options);

  const filePaths = findFiles(unionize(files), {
    cwd: projectRoot,
  });

  removeFiles(filePaths, options);
}
