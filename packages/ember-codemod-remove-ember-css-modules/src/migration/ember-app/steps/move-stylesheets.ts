import {
  createFiles,
  findFiles,
  mapFilePaths,
  moveFiles,
} from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

function moveRouteStylesheets(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('app/styles/**/*.css', {
    ignoreList: ['app/styles/app.css'],
    projectRoot,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: 'app/controllers',
  });

  moveFiles(pathMapping, options);
}

function moveAppCssToAssets(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles('app/styles/app.css', {
    projectRoot,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: 'app/assets',
  });

  moveFiles(pathMapping, options);

  const fileMap = new Map([
    [
      'app/styles/app.css',
      '/* Ember supports plain CSS out of the box. More info: https://cli.emberjs.com/release/advanced-use/stylesheets/ */\n',
    ],
  ]);

  createFiles(fileMap, options);
}

export function moveStylesheets(options: Options): void {
  moveRouteStylesheets(options);
  moveAppCssToAssets(options);
}
