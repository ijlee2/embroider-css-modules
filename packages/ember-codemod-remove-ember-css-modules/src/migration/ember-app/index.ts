import type { CodemodOptions } from '../../types/index.js';
import { createOptions } from '../../utils/steps/create-options.js';
import {
  analyzeProject,
  importStylesInComponents,
  importStylesInRoutes,
  moveStylesheets,
  updateComponentTemplates,
  updateRouteTemplates,
} from './steps/index.js';

export function migrateEmberApp(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  // Prepare for migration
  const context = analyzeProject(options);

  // Import styles in classes
  moveStylesheets(options);
  importStylesInComponents(context, options);
  importStylesInRoutes(context, options);

  // Update templates
  updateComponentTemplates(context, options);
  updateRouteTemplates(context, options);
}
