import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { processTemplate } from '@codemod-utils/blueprints';
import { doubleColonize, pascalize } from '@codemod-utils/ember';
import { createFiles, parseFilePath } from '@codemod-utils/files';

import type { OptionsForImportStyles } from '../../../types/index.js';
import { blueprintsRoot } from '../../blueprints.js';

export function createClass(
  entityName: string,
  { customizations, options }: OptionsForImportStyles,
): void {
  const { blueprintFilePaths, getFilePath } = customizations;

  const entity = {
    doubleColonizedName: doubleColonize(entityName),
    fileName: parseFilePath(entityName).name,
    name: entityName,
    pascalizedName: pascalize(entityName),
  };

  const filePath = getFilePath(entityName);

  const fileMap = new Map(
    blueprintFilePaths.map((blueprintFilePath) => {
      const blueprintFile = readFileSync(
        join(blueprintsRoot, blueprintFilePath),
        'utf8',
      );

      const file = processTemplate(blueprintFile, {
        entity,
        options,
      });

      return [filePath, file];
    }),
  );

  createFiles(fileMap, options);
}
