'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: ['embroider-css-modules-temporary', 'my-v2-addon'],
    },
    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },
  });

  const options = {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
    splitAtRoutes: [],
    staticAddonTestSupportTrees: true,
    staticAddonTrees: false, // due to ember-css-modules
    staticComponents: false, // due to ember-css-modules
    staticHelpers: false, // match the value of staticComponents
    staticModifiers: true,
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
