import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateTemplates } from '@codemod-utils/ast-template-tag';

import type { Options } from '../../types/index.js';
import {
  addLocalClasses,
  getClassToStyles,
  getModuleFilePath,
} from '../css/index.js';

export function updateTemplate(
  templateFilePath: string,
  options: Options,
): string {
  const { projectRoot } = options;

  const cssModuleFile = readFileSync(
    join(projectRoot, getModuleFilePath(templateFilePath)),
    'utf8',
  );

  const templateFile = readFileSync(
    join(projectRoot, templateFilePath),
    'utf8',
  );

  const data = {
    classToStyles: getClassToStyles(cssModuleFile),
    isHbs: templateFilePath.endsWith('.hbs'),
  };

  if (data.isHbs) {
    return addLocalClasses(templateFile, data);
  }

  return updateTemplates(templateFile, (code) => {
    return addLocalClasses(code, data);
  });
}
