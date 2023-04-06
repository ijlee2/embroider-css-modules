import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { createFiles } from '../../../../utils/files.js';

function updateTemplate(customizations, options) {
  const { entityName, getFilePath } = customizations;
  const { projectRoot } = options;

  const filePath = getFilePath(entityName);

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  try {
    // ...

    const fileMapping = new Map([[filePath, file]]);

    createFiles(fileMapping, options);
  } catch (e) {
    console.warn(
      `WARNING: updateTemplate could not update \`${filePath}\`. Please manually update the file. (${e.message})\n`
    );
  }
}

export function updateTemplates(customizations, options) {
  const { entities, getFilePath } = customizations;

  for (const [entityName, extensions] of entities) {
    const hasTemplate = extensions.has('.hbs');

    if (!hasTemplate) {
      continue;
    }

    updateTemplate({ entityName, getFilePath }, options);
  }
}
