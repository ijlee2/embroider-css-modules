import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { blueprintRoot, processTemplate } from '../../../utils/blueprints.js';
import { createFiles } from '../../../utils/files.js';
import { parseEntityName } from '../../../utils/string.js';

function getFilePath(entityName, options) {
  const { project } = options;

  let filePath = join('app/controllers', entityName);

  if (project.hasTypeScript) {
    filePath += '.ts';
  } else {
    filePath += '.js';
  }

  return filePath;
}

function createClass(entityName, options) {
  const { project } = options;

  const blueprintFilePaths = project.hasTypeScript
    ? ['ember-cli/controller/typescript.ts']
    : ['ember-cli/controller/javascript.js'];

  const fileMapping = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const filePath = getFilePath(entityName, options);

      const blueprintFile = readFileSync(
        join(blueprintRoot, blueprintFilePath),
        'utf8'
      );

      const file = processTemplate(blueprintFile, {
        entity: parseEntityName(entityName),
        options,
      });

      return [filePath, file];
    })
  );

  createFiles(fileMapping, options);
}

/* eslint-disable-next-line no-unused-vars */
function updateClass(entityName, options) {
  // ...
}

function updateRouteClasses(context, options) {
  for (const [entityName, extensions] of context.routes) {
    const hasClass = extensions.has('.js') || extensions.has('.ts');
    const hasStylesheet = extensions.has('.css');

    if (!hasStylesheet) {
      continue;
    }

    if (!hasClass) {
      createClass(entityName, options);

      continue;
    }

    updateClass(entityName, options);
  }
}

export function importStylesInRoutes(context, options) {
  updateRouteClasses(context, options);
}
