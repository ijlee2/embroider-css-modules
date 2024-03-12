import { join } from 'node:path';

import type {
  Context,
  Options,
  OptionsForImportStyles,
} from '../../../types/index.js';
import { importStyles } from '../../../utils/steps/import-styles/index.js';

type Customizations = OptionsForImportStyles['customizations'];

function getBlueprintFilePaths(
  options: Options,
): Customizations['blueprintFilePaths'] {
  const { project } = options;

  if (project.hasTypeScript) {
    return ['ember-cli/component/typescript.ts'];
  }

  return ['ember-cli/component/javascript.js'];
}

function getFilePath(options: Options): Customizations['getFilePath'] {
  const { componentStructure, project } = options;

  return function (entityName: string) {
    let filePath = join('src/components', entityName);

    if (componentStructure === 'nested') {
      filePath += '/index';
    }

    if (project.hasTypeScript) {
      filePath += '.ts';
    } else {
      filePath += '.js';
    }

    return filePath;
  };
}

export function importStylesInComponents(
  context: Context,
  options: Options,
): void {
  const customizations = {
    blueprintFilePaths: getBlueprintFilePaths(options),
    getFilePath: getFilePath(options),
  };

  importStyles(context.components, {
    customizations,
    options,
  });
}
