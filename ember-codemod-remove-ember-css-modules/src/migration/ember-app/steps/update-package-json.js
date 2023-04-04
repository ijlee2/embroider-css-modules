import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { convertToMap, convertToObject } from '../../../utils/json.js';

function updateDevDependencies(packageJson) {
  const devDependencies = convertToMap(packageJson['devDependencies']);

  const packagesToDelete = ['ember-css-modules'];

  packagesToDelete.forEach((packageName) => {
    devDependencies.delete(packageName);
  });

  packageJson['devDependencies'] = convertToObject(devDependencies);
}

export function updatePackageJson(options) {
  const { projectRoot } = options;

  const oldPath = join(projectRoot, 'package.json');
  const oldFile = readFileSync(oldPath, 'utf8');
  const packageJson = JSON.parse(oldFile);

  updateDevDependencies(packageJson);

  const newFile = JSON.stringify(packageJson, null, 2) + '\n';

  writeFileSync(oldPath, newFile, 'utf8');
}
