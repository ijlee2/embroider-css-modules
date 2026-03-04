import { analyzeProject, createOptions, updateProject } from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export async function runCodemod(
  codemodOptions: CodemodOptions,
): Promise<void> {
  const options = createOptions(codemodOptions);
  const project = await analyzeProject(options);
  await updateProject(project, options);
}
