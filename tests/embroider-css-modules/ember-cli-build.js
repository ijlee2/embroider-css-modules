'use strict';

const sideWatch = require('@embroider/broccoli-side-watch');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: [
        // 'embroider-css-modules',
      ],
    },

    'ember-cli-babel': {
      enableTypeScriptTransform: true,
    },

    trees: {
      app: sideWatch('app', {
        watching: ['../../packages/embroider-css-modules/src'],
      }),
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');

  return maybeEmbroider(app);
};
