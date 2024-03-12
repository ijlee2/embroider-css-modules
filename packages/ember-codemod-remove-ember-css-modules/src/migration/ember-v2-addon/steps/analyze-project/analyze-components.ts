import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Entities, Options } from '../../../../types/index.js';
import { analyzeFilePaths } from '../../../../utils/steps/analyze-project/analyze-file-paths.js';

export function analyzeComponents(options: Options): Entities {
  const { componentStructure, projectRoot } = options;

  const classFilePaths = findFiles('src/components/**/*.{js,ts}', {
    ignoreList: ['src/components/**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'src/components',
      to: '',
    });
  });

  const stylesheetFilePaths = findFiles('src/components/**/*.css', {
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'src/components',
      to: '',
    });
  });

  const templateFilePaths = findFiles('src/components/**/*.hbs', {
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: 'src/components',
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
