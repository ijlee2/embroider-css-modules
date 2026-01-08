import { createFiles } from '@codemod-utils/files';

import type { Options, Project } from '../../types/index.js';
import { updateTemplate } from '../../utils/update-project/index.js';

export function updateTemplates(project: Project, options: Options): void {
  const fileMap = new Map<string, string>();

  project.components.forEach((_data, templateFilePath) => {
    const { output, status } = updateTemplate(templateFilePath, options);

    if (status === 'error') {
      return;
    }

    fileMap.set(templateFilePath, output.templateFile);
  });

  project.routes.forEach((_data, templateFilePath) => {
    const { output, status } = updateTemplate(templateFilePath, options);

    if (status === 'error') {
      return;
    }

    fileMap.set(templateFilePath, output.templateFile);
  });

  createFiles(fileMap, options);
}
