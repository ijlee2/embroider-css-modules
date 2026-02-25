import type { Options } from '../../types/index.js';
import { normalizedJoin } from '../files/index.js';

export function getPatternForComponents(
  options: Pick<Options, 'entity'>,
): string[] {
  const source = 'app';
  const { entity } = options;

  if (entity === undefined) {
    return [`${source}/components/**/*.{gjs,gts,hbs}`];
  }

  return [
    normalizedJoin(source, 'components', `${entity}.{gjs,gts,hbs}`),
    normalizedJoin(source, 'components', entity, '**/*.{gjs,gts,hbs}'),
  ];
}

export function getPatternForRoutes(
  options: Pick<Options, 'entity'>,
): string[] {
  const source = 'app';
  const { entity } = options;

  if (entity === undefined) {
    return [`${source}/templates/**/*.{gjs,gts,hbs}`];
  }

  return [
    normalizedJoin(source, 'templates', `${entity}.{gjs,gts,hbs}`),
    normalizedJoin(source, 'templates', entity, '**/*.{gjs,gts,hbs}'),
  ];
}
