import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';

import type { ClassNameToStyles, Options, Project } from '../../types/index.js';
import { getPatternForRoutes } from '../../utils/analyze-project/index.js';
import { getEntityData } from './get-entity-data.js';

export function analyzeRoutes(
  classNameToStyles: ClassNameToStyles,
  options: Options,
): Project['routes'] {
  const { convert, projectRoot } = options;

  const routes: Project['routes'] = new Map();

  if (!convert.routes) {
    return routes;
  }

  const filePaths = findFiles(getPatternForRoutes(options), {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const entityData = getEntityData(file, {
      classNameToStyles,
      isHbs: filePath.endsWith('.hbs'),
    });

    if (entityData.localStyles.length > 0) {
      routes.set(filePath, entityData);
    }
  });

  return routes;
}
