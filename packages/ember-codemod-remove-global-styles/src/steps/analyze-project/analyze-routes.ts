import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { ClassNameToStyles, Options, Project } from '../../types/index.js';
import { getPatternForRoutes } from '../../utils/analyze-project/index.js';
import { task } from './analyze-routes/task.js';

export async function analyzeRoutes(
  classNameToStyles: ClassNameToStyles,
  options: Options,
): Promise<Project['routes']> {
  const { convert, projectRoot } = options;

  const routes: Project['routes'] = new Map();

  if (!convert.routes) {
    return routes;
  }

  const filePaths = findFiles(getPatternForRoutes(options), {
    projectRoot,
  });

  const datasets: Parameters<typeof task>[] = [];

  filePaths.forEach((filePath) => {
    datasets.push([filePath, classNameToStyles, options]);
  });

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './analyze-routes/worker.js',
  });

  return new Map(entries.filter((entry) => entry !== undefined));
}
