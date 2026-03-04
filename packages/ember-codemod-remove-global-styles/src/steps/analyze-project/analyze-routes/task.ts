import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type {
  ClassNameToStyles,
  EntityData,
  Options,
} from '../../../types/index.js';
import { getEntityData } from '../get-entity-data.js';

export function task(
  filePath: string,
  classNameToStyles: ClassNameToStyles,
  options: Options,
): [filePath: string, entityData: EntityData] | undefined {
  const { projectRoot } = options;

  const file = readFileSync(join(projectRoot, filePath), 'utf8');

  const entityData = getEntityData(file, {
    classNameToStyles,
    isHbs: filePath.endsWith('.hbs'),
  });

  if (entityData.localStyles.length === 0) {
    return undefined;
  }

  return [filePath, entityData];
}
