import {
  analyzeProject,
  createCssModuleFiles,
  createOptions,
  updateProject,
} from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  const project = analyzeProject(options);
  createCssModuleFiles(project, options);
  updateProject(project, options);
}
