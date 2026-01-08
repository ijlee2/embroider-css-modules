import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateTemplates } from '@codemod-utils/ast-template-tag';

import type { Options } from '../../types/index.js';
import {
  addLocalClasses,
  getClassToStyles,
  getModuleFilePath,
} from '../css/index.js';

type Output =
  | {
      output: {
        templateFile: string;
      };
      status: 'success';
    }
  | {
      output: undefined;
      status: 'error';
    };

export function updateTemplate(
  templateFilePath: string,
  options: Options,
): Output {
  const { projectRoot } = options;

  let templateFile = readFileSync(join(projectRoot, templateFilePath), 'utf8');

  const cssModuleFile = readFileSync(
    join(projectRoot, getModuleFilePath(templateFilePath)),
    'utf8',
  );

  const data = {
    classToStyles: getClassToStyles(cssModuleFile),
    isHbs: templateFilePath.endsWith('.hbs'),
  };

  try {
    if (data.isHbs) {
      templateFile = addLocalClasses(templateFile, data);

      return {
        output: {
          templateFile,
        },
        status: 'success',
      };
    }

    templateFile = updateTemplates(templateFile, (code) => {
      return addLocalClasses(code, data);
    });

    return {
      output: {
        templateFile,
      },
      status: 'success',
    };
  } catch (error) {
    console.log(`WARNING: ${templateFilePath} could not be updated.`);
    console.log((error as Error).message);

    return {
      output: undefined,
      status: 'error',
    };
  }
}
