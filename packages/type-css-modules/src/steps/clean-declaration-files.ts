import { findFiles, removeFiles, unionize } from '@codemod-utils/files';

import type { Options } from '../types/index.js';
import { getCssDeclarationFilePaths } from '../utils/css.js';

export function cleanDeclarationFiles(options: Options): void {
  const { projectRoot } = options;

  const files = getCssDeclarationFilePaths(options);

  const filePaths = findFiles(unionize(files), {
    projectRoot,
  });

  removeFiles(filePaths, options);
}
