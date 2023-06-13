import { parse } from 'node:path';

import { classifyEntityName } from './classify.js';
import { doubleColonizeEntityName } from './double-colonize.js';

type ParsedEntityName = {
  classifiedName: string;
  doubleColonizedName: string;
  fileName: string;
  name: string;
};

export function parseEntityName(entityName: string): ParsedEntityName {
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
