/* eslint-disable no-unused-vars */
import { analyzeApp, createOptions, updatePackageJson } from './steps/index.js';

export function migrateEmberApp(codemodOptions) {
  const options = createOptions(codemodOptions);
  const { hasEmberCssModules } = options.project;

  // Guarantee idempotency
  if (!hasEmberCssModules) {
    return;
  }

  // Prepare for migration
  const context = analyzeApp(options);

  // Fine-tune individual files
  updatePackageJson(options);
}
