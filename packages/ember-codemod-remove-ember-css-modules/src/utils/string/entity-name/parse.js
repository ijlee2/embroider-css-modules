import { parse } from 'node:path';

import { classifyEntityName } from './classify.js';
import { doubleColonizeEntityName } from './double-colonize.js';

export function parseEntityName(entityName) {
  const classifiedName = classifyEntityName(entityName);
  const doubleColonizedName = doubleColonizeEntityName(entityName);
  const { name: fileName } = parse(entityName);

  const entity = {
    classifiedName,
    doubleColonizedName,
    fileName,
    name: entityName,
  };

  return entity;
}
