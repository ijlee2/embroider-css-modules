import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { createFiles, findFiles } from '@codemod-utils/files';

import type { Options, Project } from '../types/index.js';
import { getModuleFilePath, printStyles } from '../utils/css/index.js';
import { getEntityData } from './analyze-project/get-entity-data.js';
import { getFile, logErrors } from './create-css-module-files/index.js';

export function createCssModuleFiles(project: Project, options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('app/{components,templates}/**/*.{gjs,gts,hbs}', {
    projectRoot,
  });

  const fileMap = new Map<string, string>();

  filePaths.forEach((filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const entityData = getEntityData(file, {
      classToStyles: project.classToStyles,
      isHbs: filePath.endsWith('.hbs'),
    });

    if (entityData.localStyles.length === 0) {
      return;
    }

    const cssModuleFilePath = getModuleFilePath(filePath);

    let cssModuleFile = getFile(cssModuleFilePath, options);

    cssModuleFile += `${printStyles(entityData.localStyles)}\n`;

    fileMap.set(cssModuleFilePath, cssModuleFile);

    logErrors(entityData.errors, { cssModuleFilePath });
  });

  createFiles(fileMap, { projectRoot });
}
