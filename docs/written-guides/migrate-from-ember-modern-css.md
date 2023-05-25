# Migrate from ember-modern-css

Already implemented [Ember + Modern CSS](https://github.com/evoactivity/ember-modern-css) in your project? You can reach `embroider-css-modules` in a few steps.

1. [Install embroider-css-modules](#install-embroider-css-modules)
1. [Install type-css-modules](#install-type-css-modules)
1. [Give the local scope to the styles that you own](#give-the-local-scope-to-the-styles-that-you-own)
1. [Use the {{local-class}} helper](#use-the-local-class-helper)


## Install embroider-css-modules

```sh
ember install embroider-css-modules
```

[Learn more about the package](../../packages/embroider-css-modules/README.md).


## Install type-css-modules

⚠️ You may skip this step if your project doesn't support TypeScript.

If you have typed `*.css` files, either by installing [`@types/css-modules`](https://www.npmjs.com/package/@types/css-modules) or defining the type to be `Record<string, string>` in `types/global.d.ts`, please undo the change.

Instead, install `type-css-modules` to generate the declaration files.

```json5
/* package.json */
{
  "scripts": {
    "lint:types": "tsc --noEmit",
    "prelint:types": "type-css-modules --src app"
  },
  "devDependencies": {
    "type-css-modules": "...",
    "typescript": "..."
  }
}
```

[Learn more about the package](../../packages/type-css-modules/README.md).


## Give the local scope to the styles that you own

Update [`mode`](https://webpack.js.org/loaders/css-loader/#mode) (a configuration option for Webpack) to be a function that returns `'local'` or `'global'`.

<details>

<summary><code>ember-cli-build.js</code></summary>

For completeness, the code below shows all [Webpack options](https://github.com/embroider-build/embroider/blob/main/packages/webpack/src/options.ts) that are needed to implement CSS modules. The most important change is `cssLoaderOptions.modules.mode`.

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
    packagerOptions: {
      cssLoaderOptions: {
        modules: {
          localIdentName: isProduction()
            ? '[sha512:hash:base64:5]'
            : '[path][name]__[local]',
          mode: (resourcePath) => {
            const hostAppLocation = `${options.workspaceDir}/<path/to/your/project>`;

            return resourcePath.includes(hostAppLocation) ? 'local' : 'global';
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

Next, remove all `:local()` pseudo-class selectors. Instead, use the `:global()` pseudo-class selector to refer to "things from outside."

<details>

<summary>Example</summary>

```css
/* Before: app/components/navigation-menu.css */
:local(.list) {
  align-items: center;
  display: flex;
}

:local(.link) {
  display: inline-block;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  white-space: nowrap;
}

:local(.link).active {
  background-color: #15202d;
}

:local(.link):hover {
  background-color: #26313d;
  transition: background-color 0.17s;
}

```

```css
/* After: app/components/navigation-menu.css */
.list {
  align-items: center;
  display: flex;
}

.link {
  display: inline-block;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  white-space: nowrap;
}

.link:global(.active) {
  background-color: #15202d;
}

.link:hover {
  background-color: #26313d;
  transition: background-color 0.17s;
}
```

</details>



## Use the {{local-class}} helper

⚠️ You may skip this step if you didn't create the `{{styles}}` helper (as suggested by [ember-modern-css](https://github.com/evoactivity/ember-modern-css)).

To apply multiple styles, use the `{{local-class}}` helper (from `embroider-css-modules`) instead.

<details>

<summary>Example</summary>

```hbs
{{! Before: app/templates/products.hbs }}
<div
  class={{styles
    this
    (concat
      (if
        this.isInExperimentalGroup
        "shared-layout products-with-details "
        "shared-layout products "
      )
      "sticky-container "
    )
  }}
>
  ...
</div>
```

```hbs
{{! After: app/templates/products.hbs }}
<div
  class={{local-class
    this.styles
    (if
      this.isInExperimentalGroup
      (array "shared-layout" "products-with-details")
      (array "shared-layout" "products")
    )
    "sticky-container"
  }}
>
  ...
</div>
```

</details>

[Learn more about the API](../../packages/embroider-css-modules/README.md#api).
