import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Entities, Options } from '../../../../types/index.js';
import { analyzeFilePaths } from '../../../../utils/steps/analyze-project/analyze-file-paths.js';

export function analyzeRoutes(options: Options): Entities {
  const { projectRoot } = options;

  const classFilePaths = findFiles('app/controllers/**/*.{js,ts}', {
    ignoreList: ['app/controllers/**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/controllers',
      to: '',
    });
  });

  const stylesheetFilePaths = findFiles('app/styles/**/*.css', {
    ignoreList: ['app/styles/app.css'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/styles',
      to: '',
    });
  });

  const templateFilePaths = findFiles('app/templates/**/*.hbs', {
    ignoreList: ['app/templates/components/**/*'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/templates',
      to: '',
    });
  });

  const filePaths = [
    ...classFilePaths,
    ...stylesheetFilePaths,
    ...templateFilePaths,
  ].sort();

  return analyzeFilePaths(filePaths);
}
