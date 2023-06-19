import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Entities, Options } from '../../../../types/index.js';
import { analyzeFilePaths } from './analyze-file-paths.js';

export function analyzeComponents(options: Options): Entities {
  const { componentStructure, projectRoot } = options;

  const classFilePaths = findFiles('app/components/**/*.{js,ts}', {
    ignoreList: ['app/components/**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/components',
      to: '',
    });
  });

  const stylesheetFilePaths = findFiles('app/components/**/*.css', {
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/components',
      to: '',
    });
  });

  const templateFilePaths = findFiles('app/components/**/*.hbs', {
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'app/components',
      to: '',
    });
  });

  const filePaths = [
    ...classFilePaths,
    ...stylesheetFilePaths,
    ...templateFilePaths,
  ].sort();

  const entities = analyzeFilePaths(filePaths);

  if (componentStructure === 'nested') {
    return new Map(
      Array.from(entities.entries()).map(([entityName, extensions]) => {
        const newEntityName = entityName.replace(/\/index$/, '');

        return [newEntityName, extensions];
      }),
    );
  }

  return entities;
}
