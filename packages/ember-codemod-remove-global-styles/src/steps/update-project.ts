import type { Options, Project } from '../types/index.js';
import {
  createStylesheets,
  updateClasses,
  updateTemplates,
} from './update-project/index.js';

export function updateProject(project: Project, options: Options): void {
  createStylesheets(project, options);
  updateClasses(project, options);
  updateTemplates(project, options);
}
