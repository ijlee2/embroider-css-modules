import { join } from 'node:path';

import { importStyles } from './shared/index.js';

function getBlueprintFilePaths(options) {
  const { project } = options;

  if (project.hasTypeScript) {
    return ['ember-cli/component/typescript.ts'];
  }

  return ['ember-cli/component/javascript.js'];
}

function getFilePath(options) {
  const { componentStructure, project } = options;

  return function (entityName) {
    let filePath = join('app/components', entityName);

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

export function importStylesInComponents(context, options) {
  const customizations = {
    blueprintFilePaths: getBlueprintFilePaths(options),
    entities: context.components,
    getFilePath: getFilePath(options),
  };

  importStyles(customizations, options);
}
