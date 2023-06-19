import { decideVersion } from '@codemod-utils/blueprints';

import type { Options } from '../../types/index.js';

const latestVersions = new Map([
  ['@embroider/compat', '3.0.2'],
  ['@embroider/core', '3.0.2'],
  ['@embroider/webpack', '3.0.0'],
  ['autoprefixer', '10.4.14'],
  ['embroider-css-modules', '0.1.9'],
  ['postcss', '8.4.24'],
  ['postcss-loader', '7.3.3'],
  ['type-css-modules', '0.2.2'],
  ['webpack', '5.87.0'],
]);

export function getVersion(packageName: string, options: Options): string {
  const { project } = options;

  return decideVersion(packageName, {
    dependencies: project.dependencies,
    latestVersions,
  });
}
