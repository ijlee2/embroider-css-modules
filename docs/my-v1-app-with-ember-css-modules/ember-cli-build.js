'use strict';

const sideWatch = require('@embroider/broccoli-side-watch');
const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: [],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    trees: {
      app: sideWatch('app', {
        watching: [
          '../../packages/embroider-css-modules/src',
          '../my-v2-addon/src',
        ],
      }),
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
    staticEmberSource: true,
    staticInvokables: false, // due to ember-css-modules
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
