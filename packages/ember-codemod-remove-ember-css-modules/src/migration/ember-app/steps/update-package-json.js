import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
  readPackageJson,
} from '@codemod-utils/json';

import { getVersion } from '../../../utils/blueprints.js';

function updateDevDependencies(packageJson, options) {
  const { project } = options;

  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToDelete = ['ember-css-modules'];

  packagesToDelete.forEach((packageName) => {
    devDependencies.delete(packageName);
  });

  const packagesToInstall = new Set(['embroider-css-modules']);

  if (project.hasTypeScript) {
    packagesToInstall.add('type-css-modules');
  }

  [...packagesToInstall].sort().forEach((packageName) => {
    const version = getVersion(packageName, options);

    devDependencies.set(packageName, version);
  });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}

function updateScripts(packageJson, options) {
  const { project } = options;

  const scripts = convertToMap(packageJson.scripts);

  if (project.hasTypeScript) {
    scripts.set('prelint:types', 'type-css-modules --src app');
  }

  packageJson['scripts'] = convertToObject(scripts);
}

export function updatePackageJson(options) {
  const { projectRoot } = options;

  const packageJson = readPackageJson(options);
  updateDevDependencies(packageJson, options);
  updateScripts(packageJson, options);

  const destination = join(projectRoot, 'package.json');
  const file = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(destination, file, 'utf8');
}
