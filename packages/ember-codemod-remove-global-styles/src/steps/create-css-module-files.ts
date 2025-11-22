import { createFiles } from '@codemod-utils/files';

import type { Options, Project } from '../types/index.js';
import { getModuleFilePath, printStyles } from '../utils/css/index.js';
import { getFile, logErrors } from './create-css-module-files/index.js';

export function createCssModuleFiles(project: Project, options: Options): void {
  const fileMap = new Map<string, string>();

  project.components.forEach((data, filePath) => {
    const cssModuleFilePath = getModuleFilePath(filePath);

    let cssModuleFile = getFile(cssModuleFilePath, options);
    cssModuleFile += `${printStyles(data.localStyles)}\n`;

    fileMap.set(cssModuleFilePath, cssModuleFile);
    logErrors(data.errors, { cssModuleFilePath });
  });

  project.routes.forEach((data, filePath) => {
    const cssModuleFilePath = getModuleFilePath(filePath);

    let cssModuleFile = getFile(cssModuleFilePath, options);
    cssModuleFile += `${printStyles(data.localStyles)}\n`;

    fileMap.set(cssModuleFilePath, cssModuleFile);
    logErrors(data.errors, { cssModuleFilePath });
  });

  createFiles(fileMap, options);
}
