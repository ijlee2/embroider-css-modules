import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateTemplates } from '@codemod-utils/ast-template-tag';
import { createFiles } from '@codemod-utils/files';

import type { Options, Project } from '../types/index.js';
import {
  addLocalClasses,
  getClassToStyles,
  getModuleFilePath,
} from '../utils/css/index.js';

export function updateProject(project: Project, options: Options): void {
  function getFile(filePath: string): string {
    return readFileSync(join(options.projectRoot, filePath), 'utf8');
  }

  const fileMap = new Map<string, string>();

  project.components.forEach((_data, filePath) => {
    const cssModuleFile = getFile(getModuleFilePath(filePath));
    let file = getFile(filePath);

    const data = {
      classToStyles: getClassToStyles(cssModuleFile),
    };

    if (filePath.endsWith('.hbs')) {
      file = addLocalClasses(file, data);
    } else {
      file = updateTemplates(file, (code) => {
        return addLocalClasses(code, data);
      });
    }

    fileMap.set(filePath, file);
  });

  project.routes.forEach((_data, filePath) => {
    const cssModuleFile = getFile(getModuleFilePath(filePath));
    let file = getFile(filePath);

    const data = {
      classToStyles: getClassToStyles(cssModuleFile),
    };

    if (filePath.endsWith('.hbs')) {
      file = addLocalClasses(file, data);
    } else {
      file = updateTemplates(file, (code) => {
        return addLocalClasses(code, data);
      });
    }

    fileMap.set(filePath, file);
  });

  createFiles(fileMap, options);
}
