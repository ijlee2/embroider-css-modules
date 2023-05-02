const latestVersions = new Map([
  ['embroider-css-modules', '0.1.1'],
  ['type-css-modules', '0.1.1'],
  ['webpack', '5.81.0'],
]);

export function decideVersion(packageName, options) {
  const { project } = options;

  const installedVersion = project.dependencies.get(packageName);

  if (installedVersion) {
    return installedVersion;
  }

  const latestVersion = latestVersions.get(packageName);

  if (!latestVersion) {
    throw new RangeError(
      `ERROR: The latest version of \`${packageName}\` is unknown.\n`,
    );
  }

  return `^${latestVersion}`;
}
