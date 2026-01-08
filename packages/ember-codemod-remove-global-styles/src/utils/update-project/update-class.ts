import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import {
  addStylesToClass,
  getClassFile,
  importStylesheet,
  replaceTemplateOnlyComponent,
} from './update-class/index.js';

type Output =
  | {
      output: {
        classFile: string;
        classFilePath: string;
      };
      status: 'success';
    }
  | {
      output: undefined;
      status: 'error';
    };

export function updateClass(
  templateFilePath: string,
  options: Options,
): Output {
  // eslint-disable-next-line prefer-const
  let { classFile, classFilePath } = getClassFile(templateFilePath, options);

  const { ext, name } = parseFilePath(classFilePath);

  const data = {
    fileName: name,
    isTemplateTag: ext === '.gjs' || ext === '.gts',
    isTypeScript: ext === '.gts' || ext === '.ts',
  };

  try {
    if (data.isTemplateTag) {
      classFile = updateJavaScript(classFile, (code) => {
        return importStylesheet(code, data);
      });

      return {
        output: {
          classFile,
          classFilePath,
        },
        status: 'success',
      };
    }

    classFile = replaceTemplateOnlyComponent(classFile, data);
    classFile = importStylesheet(classFile, data);
    classFile = addStylesToClass(classFile, data);

    return {
      output: {
        classFile,
        classFilePath,
      },
      status: 'success',
    };
  } catch (error) {
    console.log(`WARNING: ${classFilePath} could not be updated.`);
    console.log((error as Error).message);

    return {
      output: undefined,
      status: 'error',
    };
  }
}
