import { join } from 'node:path';

import { updateTemplates } from './shared/index.js';

function getFilePath() {
  return function (entityName) {
    let filePath = join('app/templates', entityName);

    filePath += '.hbs';

    return filePath;
  };
}

export function updateRouteTemplates(context, options) {
  const customizations = {
    getFilePath: getFilePath(),
  };

  updateTemplates(context.routes, {
    customizations,
    options,
  });
}
