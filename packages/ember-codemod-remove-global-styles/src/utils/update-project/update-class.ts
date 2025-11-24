import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../types/index.js';
import {
  addStylesToClass,
  getClassFile,
  importStylesheet,
  replaceTemplateOnlyComponent,
} from './update-class/index.js';

export function updateClass(
  templateFilePath: string,
  options: Options,
): {
  classFile: string;
  classFilePath: string;
} {
  // eslint-disable-next-line prefer-const
  let { classFile, classFilePath } = getClassFile(templateFilePath, options);

  const { ext, name } = parseFilePath(classFilePath);
  const data = {
    fileName: name,
    isTemplateTag: ext === '.gjs' || ext === '.gts',
    isTypeScript: ext === '.gts' || ext === '.ts',
  };

  if (data.isTemplateTag) {
    classFile = updateJavaScript(classFile, (code) => {
      return importStylesheet(code, data);
    });

    return {
      classFile,
      classFilePath,
    };
  }

  classFile = replaceTemplateOnlyComponent(classFile, data);
  classFile = importStylesheet(classFile, data);
  classFile = addStylesToClass(classFile, data);

  return {
    classFile,
    classFilePath,
  };
}
