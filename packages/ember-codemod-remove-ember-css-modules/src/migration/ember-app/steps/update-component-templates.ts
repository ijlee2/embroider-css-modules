import { join } from 'node:path';

import type {
  Context,
  Options,
  OptionsForUpdateTemplates,
} from '../../../types/index.js';
import { updateTemplates } from './update-templates/index.js';

type Customizations = OptionsForUpdateTemplates['customizations'];

function getFilePath(options: Options): Customizations['getFilePath'] {
  const { componentStructure } = options;

  return function (entityName: string) {
    let filePath = join('app/components', entityName);

    if (componentStructure === 'nested') {
      filePath += '/index';
    }

    filePath += '.hbs';

    return filePath;
  };
}

export function updateComponentTemplates(
  context: Context,
  options: Options,
): void {
  const customizations = {
    getFilePath: getFilePath(options),
  };

  updateTemplates(context.components, {
    customizations,
    options,
  });
}
