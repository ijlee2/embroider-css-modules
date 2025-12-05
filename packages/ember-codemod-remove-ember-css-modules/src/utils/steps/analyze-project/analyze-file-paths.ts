import { join, sep } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type { Entities } from '../../../types/index.js';

export function analyzeFilePaths(filePaths: string[]): Entities {
  const entities = new Map<string, Set<string>>();

  filePaths.forEach((filePath) => {
    const { dir, ext, name } = parseFilePath(filePath);
    const entityName = join(dir, name).replaceAll(sep, '/');

    if (entities.has(entityName)) {
      entities.get(entityName)!.add(ext);

      return;
    }

    entities.set(entityName, new Set([ext]));
  });

  return entities;
}
