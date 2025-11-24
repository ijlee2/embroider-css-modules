import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { ClassToStyles, Options, Project } from '../../types/index.js';
import { getEntityData } from './get-entity-data.js';

export function analyzeComponents(
  classToStyles: ClassToStyles,
  options: Options,
) {
  const { convert, folder, projectRoot } = options;

  const components: Project['components'] = new Map();

  if (!convert.components) {
    return components;
  }

  const filePaths = findFiles(
    join('app/components', folder, '**/*.{gjs,gts,hbs}'),
    {
      projectRoot,
    },
  );

  filePaths.forEach((filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const entityData = getEntityData(file, {
      classToStyles,
      isHbs: filePath.endsWith('.hbs'),
    });

    if (entityData.localStyles.length > 0) {
      components.set(filePath, entityData);
    }
  });

  return components;
}
