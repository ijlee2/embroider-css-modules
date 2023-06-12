import { join } from 'node:path';

import type {
  Context,
  Options,
  OptionsForImportStyles,
} from '../../../types/index.js';
import { importStyles } from './shared/import-styles.js';

type Customizations = OptionsForImportStyles['customizations'];

function getBlueprintFilePaths(
  options: Options,
): Customizations['blueprintFilePaths'] {
  const { project } = options;

  if (project.hasTypeScript) {
    return ['ember-cli/controller/typescript.ts'];
  }

  return ['ember-cli/controller/javascript.js'];
}

function getFilePath(options: Options): Customizations['getFilePath'] {
  const { project } = options;

  return function (entityName: string) {
    let filePath = join('app/controllers', entityName);

    if (project.hasTypeScript) {
      filePath += '.ts';
    } else {
      filePath += '.js';
    }

    return filePath;
  };
}

export function importStylesInRoutes(context: Context, options: Options): void {
  const customizations = {
    blueprintFilePaths: getBlueprintFilePaths(options),
    getFilePath: getFilePath(options),
  };

  importStyles(context.routes, {
    customizations,
    options,
  });
}
