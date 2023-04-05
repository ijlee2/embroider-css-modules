import {
  analyzeApp,
  createOptions,
  importStylesInComponents,
  importStylesInRoutes,
  moveStylesheets,
  updatePackageJson,
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

  // Fine-tune individual files
  updatePackageJson(options);
}
