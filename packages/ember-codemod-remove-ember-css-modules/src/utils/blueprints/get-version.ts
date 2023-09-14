import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@embroider/compat', '3.2.1'],
  ['@embroider/core', '3.2.1'],
  ['@embroider/webpack', '3.1.5'],
  ['autoprefixer', '10.4.15'],
  ['embroider-css-modules', '1.0.0'],
  ['postcss', '8.4.29'],
  ['postcss-loader', '7.3.3'],
  ['type-css-modules', '1.0.0'],
  ['webpack', '5.88.2'],
]);

export function getVersion(packageName: string, options: Options): string {
  const { project } = options;

  return decideVersion(packageName, {
    dependencies: project.dependencies,
    latestVersions,
  });
}
