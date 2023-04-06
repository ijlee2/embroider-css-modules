import { join } from 'node:path';

import { importStyles } from './shared/index.js';

function getBlueprintFilePaths(options) {
  const { project } = options;

  if (project.hasTypeScript) {
    return ['ember-cli/controller/typescript.ts'];
  }

  return ['ember-cli/controller/javascript.js'];
}

function getFilePath(options) {
  const { project } = options;

  return function (entityName) {
    let filePath = join('app/controllers', entityName);

    if (project.hasTypeScript) {
      filePath += '.ts';
    } else {
      filePath += '.js';
    }

    return filePath;
  };
}

export function importStylesInRoutes(context, options) {
  const customizations = {
    blueprintFilePaths: getBlueprintFilePaths(options),
    entities: context.routes,
    getFilePath: getFilePath(options),
  };

  importStyles(customizations, options);
}
