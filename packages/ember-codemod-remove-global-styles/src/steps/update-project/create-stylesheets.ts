import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { createFiles } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';
import { getModuleFilePath, printStyles } from '../../utils/css/index.js';

function getFile(filePath: string, options: Options): string {
  const { projectRoot } = options;

  try {
    return readFileSync(join(projectRoot, filePath), 'utf8');
  } catch {
    return '';
  }
}

function logErrors(cssModuleFilePath: string, errors: string[]): void {
  if (errors.length === 0) {
    return;
  }

  console.warn(`WARNING: ${cssModuleFilePath} may be incorrect.`);
  console.warn(errors.map((error) => `- ${error}`).join('\n'));
  console.log();
}

export function createStylesheets(project: Project, options: Options): void {
  const fileMap = new Map<string, string>();

  project.components.forEach((data, filePath) => {
    const cssModuleFilePath = getModuleFilePath(filePath);

    let cssModuleFile = getFile(cssModuleFilePath, options);
    cssModuleFile += `${printStyles(data.localStyles)}\n`;

    fileMap.set(cssModuleFilePath, cssModuleFile);
    logErrors(cssModuleFilePath, data.errors);
  });

  project.routes.forEach((data, filePath) => {
    const cssModuleFilePath = getModuleFilePath(filePath);

    let cssModuleFile = getFile(cssModuleFilePath, options);
    cssModuleFile += `${printStyles(data.localStyles)}\n`;

    fileMap.set(cssModuleFilePath, cssModuleFile);
    logErrors(cssModuleFilePath, data.errors);
  });

  createFiles(fileMap, options);
}
