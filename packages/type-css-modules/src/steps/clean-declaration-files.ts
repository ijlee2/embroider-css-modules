import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';
import { getCssDeclarationFilePaths } from '../utils/css.js';

export function cleanDeclarationFiles(options: Options): void {
  const { projectRoot } = options;

  const files = getCssDeclarationFilePaths(options);

  const filePaths = findFiles(files, {
    projectRoot,
  });

  removeFiles(filePaths, options);
}
