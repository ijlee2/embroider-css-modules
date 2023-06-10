import {
  createFiles,
  findFiles,
  mapFilePaths,
  moveFiles,
} from '@codemod-utils/files';

function moveRouteStylesheets(options) {
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

function moveAppCssToAssets(options) {
  const { projectRoot } = options;

  const filePaths = findFiles('app/styles/app.css', {
    projectRoot,
  });

  const pathMapping = mapFilePaths(filePaths, {
    from: 'app/styles',
    to: 'app/assets',
  });

  moveFiles(pathMapping, options);

  const fileMapping = new Map([
    [
      'app/styles/app.css',
      '/* Ember supports plain CSS out of the box. More info: https://cli.emberjs.com/release/advanced-use/stylesheets/ */\n',
    ],
  ]);

  createFiles(fileMapping, options);
}

export function moveStylesheets(options) {
  moveRouteStylesheets(options);
  moveAppCssToAssets(options);
}
