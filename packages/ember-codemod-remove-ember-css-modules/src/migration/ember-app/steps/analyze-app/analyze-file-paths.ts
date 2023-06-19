import { join, parse } from 'node:path';

import type { Entities } from '../../../../types/index.js';

export function analyzeFilePaths(filePaths: string[]): Entities {
  const entities = new Map<string, Set<string>>();

  filePaths.forEach((filePath) => {
    const { dir, ext, name } = parse(filePath);
    const entityName = join(dir, name);

    if (entities.has(entityName)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      entities.get(entityName)!.add(ext);

      return;
    }

    entities.set(entityName, new Set([ext]));
  });

  return entities;
}
