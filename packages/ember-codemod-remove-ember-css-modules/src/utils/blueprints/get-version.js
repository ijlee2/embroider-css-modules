import { decideVersion } from '@codemod-utils/blueprints';

const latestVersions = new Map([
  ['embroider-css-modules', '0.1.1'],
  ['type-css-modules', '0.1.1'],
  ['webpack', '5.81.0'],
]);

export function getVersion(packageName, options) {
  const { project } = options;

  return decideVersion(packageName, {
    dependencies: project.dependencies,
    latestVersions,
  });
}
