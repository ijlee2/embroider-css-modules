import type { CodemodOptions } from '../../types/index.js';
import { createOptions } from '../../utils/steps/create-options.js';
import {
  analyzeProject,
  importStylesInComponents,
  updateComponentTemplates,
} from './steps/index.js';

export function migrateEmberV2Addon(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);
  const context = analyzeProject(options);

  importStylesInComponents(context, options);
  updateComponentTemplates(context, options);
}
