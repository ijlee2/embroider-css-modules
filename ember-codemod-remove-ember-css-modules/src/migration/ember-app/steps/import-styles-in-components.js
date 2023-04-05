import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { blueprintRoot, processTemplate } from '../../../utils/blueprints.js';
import { createFiles } from '../../../utils/files.js';
import { parseEntityName } from '../../../utils/string.js';

function getFilePath(entityName, options) {
  const { componentStructure, project } = options;

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
}

function createClass(entityName, options) {
  const { project } = options;

  const blueprintFilePaths = project.hasTypeScript
    ? ['ember-cli/component/typescript.ts']
    : ['ember-cli/component/javascript.js'];

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

function updateComponentClasses(context, options) {
  for (const [entityName, analysis] of context.components) {
    const { hasClass, hasStylesheet } = analysis;

    if (!hasStylesheet) {
      continue;
    }

    if (!hasClass) {
      createClass(entityName, options);
    }

    updateClass(entityName, options);
  }
}

export function importStylesInComponents(context, options) {
  updateComponentClasses(context, options);
}
