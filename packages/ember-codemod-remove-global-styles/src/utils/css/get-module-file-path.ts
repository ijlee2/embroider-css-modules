import { join, normalize, relative } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

export function getModuleFilePath(templateFilePath: string): string {
  const { dir, ext, name } = parseFilePath(templateFilePath);

  if (!['.gjs', '.gts', '.hbs'].includes(ext)) {
    throw new RangeError('File extension is incorrect.');
  }

  const data = {
    isComponentTemplate: dir.startsWith(normalize('app/components')),
    isRouteTemplate: dir.startsWith(normalize('app/templates')),
    isTemplateTag: ext === '.gjs' || ext === '.gts',
  };

  if (data.isTemplateTag) {
    return join(dir, `${name}.module.css`);
  }

  if (data.isRouteTemplate) {
    const controllersDir = join(dir, relative(dir, 'app/controllers'));

    return join(controllersDir, `${name}.module.css`);
  }

  return join(dir, `${name}.module.css`);
}
