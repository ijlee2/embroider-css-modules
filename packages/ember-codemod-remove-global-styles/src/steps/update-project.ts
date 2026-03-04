import type { Options, Project } from '../types/index.js';
import {
  createStylesheets,
  updateClasses,
  updateTemplates,
} from './update-project/index.js';

export async function updateProject(
  project: Project,
  options: Options,
): Promise<void> {
  createStylesheets(project, options);
  await updateClasses(project, options);
  await updateTemplates(project, options);
}
