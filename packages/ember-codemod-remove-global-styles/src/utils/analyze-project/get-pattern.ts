import type { Options } from '../../types/index.js';
import { normalizedJoin } from '../files/index.js';

export function getPatternForComponents(
  options: Pick<Options, 'folder'>,
): string[] {
  const source = 'app';
  const { folder } = options;

  if (folder === undefined) {
    return [`${source}/components/**/*.{gjs,gts,hbs}`];
  }

  return [normalizedJoin(source, 'components', folder, '**/*.{gjs,gts,hbs}')];
}

export function getPatternForRoutes(
  options: Pick<Options, 'folder'>,
): string[] {
  const source = 'app';
  const { folder } = options;

  if (folder === undefined) {
    return [`${source}/templates/**/*.{gjs,gts,hbs}`];
  }

  return [normalizedJoin(source, 'templates', folder, '**/*.{gjs,gts,hbs}')];
}
