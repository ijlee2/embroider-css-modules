# How to migrate from ember-css-modules

You can reach `embroider-css-modules` in a few steps. (See [`ember-container-query`](https://github.com/ijlee2/ember-container-query/pull/167) for reference.)

1. [Remove `ember-css-modules`](#remove-ember-css-modules)
1. [Implement CSS modules with `webpack`](#implement-css-modules-with-webpack)
1. [Enable stricter Embroider settings (optional)](#enable-stricter-embroider-settings-optional)


## Remove ember-css-modules

Run the codemod to update syntax and project dependencies. Afterwards, review and update code as needed.

```sh
npx ember-codemod-remove-ember-css-modules <arguments>
```

For more information, please see [the codemod's `README`](../packages/ember-codemod-remove-ember-css-modules/README.md).


## Implement CSS modules with webpack

Configure `css-loader` and `postcss-loader`. Here is a minimal set of required changes.

<details>

<summary><code>.eslintrc.js</code></summary>

```js
'use strict';

module.exports = {
  // ...
  overrides: [
    // Node files
    {
      files: [
        './postcss.config.js',
        // ...
      ],
    },
  ],
};
```

</details>

<details>

<summary><code>ember-cli-build.js</code></summary>

```js
'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

function isProduction() {
  return EmberApp.env() === 'production';
}

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ...
  });

  const options = {
    // ...
    packagerOptions: {
      cssLoaderOptions: {
        modules: {
          localIdentName: isProduction()
            ? '[sha512:hash:base64:5]'
            : '[path][name]__[local]',
          mode: (resourcePath) => {
            const hostAppWorkspaceDir = options.workspaceDir;
            const isHostAppPath = resourcePath.includes(hostAppWorkspaceDir);

            return isHostAppPath ? 'local' : 'global';
          },
        },
        sourceMap: !isProduction(),
      },

      publicAssetURL: '/',

      webpackConfig: {
        module: {
          rules: [
            {
              exclude: /node_modules/,
              test: /\.css$/i,
              use: [
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: !isProduction(),
                    postcssOptions: {
                      config: './postcss.config.js',
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
```

</details>

<details>

<summary><code>package.json</code></summary>

```json
{
  "devDependencies": {
    "autoprefixer": "...",
    "postcss": "...",
    "postcss-loader": "..."
  }
}
```

</details>

<details>

<summary><code>postcss.config.js</code></summary>

```js
  const env = process.env.EMBER_ENV ?? 'development';
  const plugins = [require('autoprefixer')];

  if (env === 'production') {
    // plugins.push(...);
  }

  module.exports = {
    plugins,
  };
```

</details>

For more information, please see the [`css-loader` documentation](https://webpack.js.org/loaders/css-loader/).


## Enable stricter Embroider settings (optional)

With `ember-css-modules` gone, you may be able to apply stricter settings for Embroider.

<details>

<summary><code>ember-cli-build.js</code></summary>

```js
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ...
  });

  const options = {
    packagerOptions: {
      // ...
    },
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true, // <-- new
    staticComponents: true, // <-- new
    staticHelpers: true,
    staticModifiers: true,
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
```

</details>

For more information, please refer to [Embroider's `README`](https://github.com/embroider-build/embroider/#options).
