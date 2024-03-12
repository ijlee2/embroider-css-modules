import { join } from 'node:path';

import type {
  Context,
  Options,
  OptionsForUpdateTemplates,
} from '../../../types/index.js';
import { updateTemplates } from '../../../utils/steps/update-templates/index.js';

type Customizations = OptionsForUpdateTemplates['customizations'];

function getFilePath(): Customizations['getFilePath'] {
  return function (entityName: string) {
    let filePath = join('app/templates', entityName);

    filePath += '.hbs';

    return filePath;
  };
}

export function updateRouteTemplates(context: Context, options: Options): void {
  const customizations = {
    getFilePath: getFilePath(),
  };

  updateTemplates(context.routes, {
    customizations,
    options,
  });
}
