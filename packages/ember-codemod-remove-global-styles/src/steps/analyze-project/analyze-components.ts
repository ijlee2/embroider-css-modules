import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { ClassToStyles, Options, Project } from '../../types/index.js';
import { getEntityData } from './get-entity-data.js';

export function analyzeComponents(
  classToStyles: ClassToStyles,
  options: Options,
) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/components/**/*.{gjs,gts,hbs}', {
    projectRoot,
  });

  const components: Project['components'] = new Map();

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
