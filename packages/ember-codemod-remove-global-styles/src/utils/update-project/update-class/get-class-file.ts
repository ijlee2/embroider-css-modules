import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

export function getClassFile(
  templateFilePath: string,
  options: Options,
): {
  classFile: string;
  classFilePath: string;
} {
  const { projectRoot } = options;

  const { dir, ext, name } = parseFilePath(templateFilePath);
  const data = {
    isRouteTemplate: dir.startsWith('app/templates'),
    isTemplateTag: ext === '.gjs' || ext === '.gts',
  };

  if (data.isTemplateTag) {
    const classFile = readFileSync(join(projectRoot, templateFilePath), 'utf8');

    return {
      classFile,
      classFilePath: templateFilePath,
    };
  }

  if (data.isRouteTemplate) {
    const controllersDir = join(dir, relative(dir, 'app/controllers'));

    const classFilePaths = findFiles(join(controllersDir, `${name}.{js,ts}`), {
      projectRoot,
    });

    if (classFilePaths.length === 0) {
      const classFilePath = join(controllersDir, `${name}.js`);

      return {
        classFilePath,
        classFile: [
          `import Controller from '@ember/controller';`,
          ``,
          `export default class extends Controller {}`,
          ``,
        ].join('\n'),
      };
    }

    const classFilePath = classFilePaths[0]!;

    return {
      classFilePath,
      classFile: readFileSync(join(projectRoot, classFilePath), 'utf8'),
    };
  }

  const classFilePaths = findFiles(join(dir, `${name}.{js,ts}`), {
    projectRoot,
  });

  if (classFilePaths.length === 0) {
    const classFilePath = join(dir, `${name}.js`);

    return {
      classFilePath,
      classFile: [
        `import Component from '@glimmer/component';`,
        ``,
        `export default class extends Component {}`,
        ``,
      ].join('\n'),
    };
  }

  const classFilePath = classFilePaths[0]!;

  return {
    classFilePath,
    classFile: readFileSync(join(projectRoot, classFilePath), 'utf8'),
  };
}
