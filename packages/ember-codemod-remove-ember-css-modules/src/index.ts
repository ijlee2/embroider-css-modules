import { migrateEmberApp } from './migration/index.js';
import type { CodemodOptions } from './types/index.js';

export function removeEmberCssModules(codemodOptions: CodemodOptions): void {
  migrateEmberApp(codemodOptions);
}
