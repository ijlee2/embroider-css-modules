import { createFiles } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';
import { updateClass } from '../../utils/update-project/index.js';

export function updateClasses(project: Project, options: Options): void {
  const fileMap = new Map<string, string>();

  project.components.forEach((_data, templateFilePath) => {
    const { classFile, classFilePath } = updateClass(templateFilePath, options);
    fileMap.set(classFilePath, classFile);
  });

  project.routes.forEach((_data, templateFilePath) => {
    const { classFile, classFilePath } = updateClass(templateFilePath, options);
    fileMap.set(classFilePath, classFile);
  });

  createFiles(fileMap, options);
}
