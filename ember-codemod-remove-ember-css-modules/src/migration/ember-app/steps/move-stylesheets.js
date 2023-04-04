import {
  createFiles,
  findFiles,
  mapFilePaths,
  moveFiles,
} from '../../../utils/files.js';

function moveAppCssToAssets(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/styles/app.css', {
    cwd: projectRoot,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: 'app/assets',
  });

  moveFiles(pathMapping, options);

  // Create an empty file
  const fileMapping = new Map([['app/styles/app.css', '']]);

  createFiles(fileMapping, options);
}

function moveRouteStylesheets(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/styles/**/*.css', {
    cwd: projectRoot,
    ignoreList: ['app/styles/app.css'],
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: 'app/controllers',
  });

  moveFiles(pathMapping, options);
}

export function moveStylesheets(options) {
  moveRouteStylesheets(options);
  moveAppCssToAssets(options);
}
