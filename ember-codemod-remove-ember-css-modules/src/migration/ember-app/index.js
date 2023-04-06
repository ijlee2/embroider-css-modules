import {
  analyzeApp,
  createOptions,
  importStylesInComponents,
  importStylesInRoutes,
  moveStylesheets,
  updateComponentTemplates,
  updatePackageJson,
  updateRouteTemplates,
} from './steps/index.js';

export function migrateEmberApp(codemodOptions) {
  const options = createOptions(codemodOptions);
  const { hasEmberCssModules } = options.project;

  // Guarantee idempotency
  if (!hasEmberCssModules) {
    return;
  }

  // Prepare for migration
  const context = analyzeApp(options);

  // Import styles in classes
  moveStylesheets(options);
  importStylesInComponents(context, options);
  importStylesInRoutes(context, options);

  // Update templates
  updateComponentTemplates(context, options);
  updateRouteTemplates(context, options);

  // Fine-tune individual files
  updatePackageJson(options);
}
