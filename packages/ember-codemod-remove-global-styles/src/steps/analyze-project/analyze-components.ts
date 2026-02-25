import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { ClassNameToStyles, Options, Project } from '../../types/index.js';
import { getPatternForComponents } from '../../utils/analyze-project/index.js';
import { getEntityData } from './get-entity-data.js';

export function analyzeComponents(
  classNameToStyles: ClassNameToStyles,
  options: Options,
): Project['components'] {
  const { convert, projectRoot } = options;

  const components: Project['components'] = new Map();

  if (!convert.components) {
    return components;
  }

  const filePaths = findFiles(getPatternForComponents(options), {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const entityData = getEntityData(file, {
      classNameToStyles,
      isHbs: filePath.endsWith('.hbs'),
    });

    if (entityData.localStyles.length > 0) {
      components.set(filePath, entityData);
    }
  });

  return components;
}
