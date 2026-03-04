import { createFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { Options, Project } from '../../types/index.js';
import { task } from './update-templates/task.js';

export async function updateTemplates(
  project: Project,
  options: Options,
): Promise<void> {
  const datasets: Parameters<typeof task>[] = [];

  project.components.forEach((_data, templateFilePath) => {
    datasets.push([templateFilePath, options]);
  });

  project.routes.forEach((_data, templateFilePath) => {
    datasets.push([templateFilePath, options]);
  });

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './update-templates/worker.js',
  });

  const fileMap = new Map<string, string>(
    entries.filter((entry) => entry !== undefined),
  );

  createFiles(fileMap, options);
}
