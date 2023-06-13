import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['embroider-css-modules', '0.1.7'],
  ['type-css-modules', '0.1.5'],
  ['webpack', '5.86.0'],
]);

export function getVersion(packageName: string, options: Options): string {
  const { project } = options;

  return decideVersion(packageName, {
    dependencies: project.dependencies,
    latestVersions,
  });
}
