import { join } from 'node:path';

import { updateTemplates } from './shared/index.js';

function getFilePath(options) {
  const { componentStructure } = options;

  return function (entityName) {
    let filePath = join('app/components', entityName);

    if (componentStructure === 'nested') {
      filePath += '/index';
    }

    filePath += '.hbs';

    return filePath;
  };
}

export function updateComponentTemplates(context, options) {
  const customizations = {
    entities: context.components,
    getFilePath: getFilePath(options),
  };

  updateTemplates(customizations, options);
}
