import type { Options, Project } from '../types/index.js';
import {
  createStylesheets,
  updateClasses,
  updateTemplates,
} from './update-project/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function updateProject(
  project: Project,
  options: Options,
): Promise<void> {
  createStylesheets(project, options);
  updateClasses(project, options);
  updateTemplates(project, options);
}
