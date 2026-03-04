import { findFiles } from '@codemod-utils/files';
import { parallelize } from '@codemod-utils/threads';

import type { ClassNameToStyles, Options, Project } from '../../types/index.js';
import { getPatternForComponents } from '../../utils/analyze-project/index.js';
import { task } from './analyze-components/task.js';

export async function analyzeComponents(
  classNameToStyles: ClassNameToStyles,
  options: Options,
): Promise<Project['components']> {
  const { convert, projectRoot } = options;

  if (!convert.components) {
    return new Map();
  }

  const filePaths = findFiles(getPatternForComponents(options), {
    projectRoot,
  });

  const datasets: Parameters<typeof task>[] = [];

  filePaths.forEach((filePath) => {
    datasets.push([filePath, classNameToStyles, options]);
  });

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './analyze-components/worker.js',
  });

  return new Map(entries.filter((entry) => entry !== undefined));
}
