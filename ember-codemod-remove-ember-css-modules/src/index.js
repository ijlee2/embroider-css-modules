import { migrateEmberApp } from './migration/index.js';

export function removeEmberCssModules(codemodOptions) {
  migrateEmberApp(codemodOptions);
}
