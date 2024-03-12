import { migrateEmberApp, migrateEmberV2Addon } from './migration/index.js';
import type { CodemodOptions } from './types/index.js';

export function removeEmberCssModules(codemodOptions: CodemodOptions): void {
  switch (codemodOptions.projectType) {
    case 'app': {
      migrateEmberApp(codemodOptions);
      break;
    }

    case 'v2-addon': {
      migrateEmberV2Addon(codemodOptions);
      break;
    }
  }
}
