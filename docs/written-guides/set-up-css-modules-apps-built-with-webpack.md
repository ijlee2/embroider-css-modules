# Set up CSS modules (apps built with Webpack)

We will use Webpack and PostCSS to implement CSS modules.

1. [Install dependencies](#install-dependencies)
1. [Configure Webpack](#configure-webpack)
    - [Update ember-cli-build.js](#update-ember-cli-buildjs)
    - [Set up PostCSS](#set-up-postcss)
    - [Move app.css code](#move-appcss-code)
1. [Style your first component](#style-your-first-component)
    - [Glimmer component](#glimmer-component)
    - [&lt;template&gt; tag](#template-tag)
    - [CSS declaration files](#css-declaration-files)
    - [Do the file location and name matter?](#do-the-file-location-and-name-matter)
    - [Can I use the file extension \*.module.css?](#can-i-use-the-file-extension-modulecss)
    - [Write tests](#write-tests)
1. [Style your first route](#style-your-first-route)
    - [&lt;template&gt; tag](#template-tag-1)
    - [Do the file location and name matter?](#do-the-file-location-and-name-matter-1)

> [!NOTE]
> If you get lost, you can check how [`my-v1-app`](../my-v1-app) is set up.


## Install dependencies

You will need these dependencies to build an Embroider app with Webpack.

- `@embroider/compat`
- `@embroider/core`
- `@embroider/webpack`
- `webpack`

For PostCSS, here is what you likely need at minimum.

- `autoprefixer`
- `postcss`
- `postcss-loader`

Finally, some packages to improve your developer experience (DX).

- [`embroider-css-modules`](../../packages/embroider-css-modules/README.md)
- [`type-css-modules`](../../packages/type-css-modules/README.md)<sup>1</sup>

All in all, here's a one-line command for installation:

```sh
pnpm install --dev \
  @embroider/compat @embroider/core @embroider/webpack webpack \
  autoprefixer postcss postcss-loader \
  embroider-css-modules type-css-modules
```

<sup>1. Needed only if you have a TypeScript project.</sup>


## Configure Webpack

In this step, you will update two files: `ember-cli-build.js` and `postcss.config.js`.

If you have a new Ember app, you can copy-paste the starter code for `ember-cli-build.js`. The code defines a variable called `options`, which you will update later.

<details>

<summary>Starter code for <code>ember-cli-build.js</code></summary>

You may remove the `ember-cli-babel` option if your project doesn't support TypeScript.

```js
'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

function isProduction() {
  return EmberApp.env() === 'production';
}

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
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
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
```

</details>

> [!NOTE]
> Even if you already have an Embroider app, please do compare your `ember-cli-build.js` to the starter code so that we are on the same page.


### Update ember-cli-build.js

You'll need to set these [Webpack options](https://github.com/embroider-build/embroider/blob/main/packages/webpack/src/options.ts): `cssLoaderOptions`, `publicAssetURL`, and `webpackConfig`. You can do so by adding a key named `packagerOptions` to `options`.

<details>

<summary><code>options</code> variable</summary>

```js
const options = {
  packagerOptions: {
    cssLoaderOptions: {
      modules: {
        localIdentName: isProduction()
          ? '[sha512:hash:base64:5]'
          : '[path][name]__[local]',
        mode: (resourcePath) => {
          const hostAppLocation = 'node_modules/.embroider/rewritten-app';

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
            test: /(node_modules\/\.embroider\/rewritten-app\/)(.*\.css)$/i,
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
          /*
            Uncomment this rule to load asset files, e.g. fonts, icons, etc.
            See https://webpack.js.org/guides/asset-modules/ for more information.
          */
          // {
          //   test: /(node_modules\/\.embroider\/rewritten-app\/)(.*\.(ttf|woff))$/,
          //   type: 'asset/resource',
          // },
        ],
      },
    },
  },
  skipBabel: [
    {
      package: 'qunit',
    },
  ],
};
```

</details>

The most important part is [`cssLoaderOptions.modules.mode`](https://webpack.js.org/loaders/css-loader/#mode). It helps Webpack decide if a CSS file comes from your app (local) or "outside" (global).

```js
function mode(resourcePath) {
  const hostAppLocation = 'node_modules/.embroider/rewritten-app';

  return resourcePath.includes(hostAppLocation) ? 'local' : 'global';
}
```

> [!IMPORTANT]
> If your app lives in a monorepo, please include the relative path from the workspace root to the app. This way, Webpack can distinguish CSS files from your app (local) from those from an addon in the monorepo (global).
>
> ```js
> // If your app is located at `docs-app`
> const hostAppLocation = 'docs-app/node_modules/.embroider/rewritten-app';
> ```


### Set up PostCSS

[Webpack supports PostCSS](https://webpack.js.org/loaders/postcss-loader/). Create the file `postcss.config.js`, then list the PostCSS plugins that you need (e.g. `autoprefixer`).

```sh
# From the project root
touch postcss.config.js
```

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

<details>

<summary>Use <code>eslint-plugin-n</code>?</summary>

In `.eslintrc.js`, find the override rule for Node files. Add `postcss.config.js` to the list of files.

```js
'use strict';

module.exports = {
  overrides: [
    // Node files
    {
      files: [
        './postcss.config.js',
        // ...
      ],
      extends: ['plugin:n/recommended'],
    },
  ],
};
```

</details>


### Move app.css code

To ensure the load order with Webpack, you will now import `app/styles/app.css` (which defines global styles, `@import`, `@font-face`, etc.) in `app/app.ts`.

Unfortunately, we can't import CSS files located in `app/styles`, so you'll need to move `app.css` somewhere else. To do so, let's create the folder `app/assets`.

```sh
mkdir app/assets
cp app/styles/app.css app/assets/app.css
```

> [!IMPORTANT]
> Ember expects `app/styles/app.css` to exist. Instead of deleting the file, leave it empty. You can copy-paste this default code from Ember CLI:
>
> ```css
> /* Ember supports plain CSS out of the box. More info: https://cli.emberjs.com/release/advanced-use/stylesheets/ */
> ```

Finally, import `app.css` in `app/app.ts`.

<details>

<summary><code>app/app.ts</code></summary>

```diff
+ import './assets/app.css';
+ 
import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import Resolver from 'ember-resolver';

import config from './config/environment';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
```

</details>


## Style your first component

You can style your app now. Let's create a Glimmer component to test CSS modules.

```sh
ember g component hello -gc
```

While Ember CLI can create the template and the backing class, you will need to manually create the stylesheet.

```sh
# From the project root
touch app/components/hello.css
```


### Glimmer component

The goal is to display `Hello world!` in a `<div>`-container. In the stylesheet, define the class selector `.container`.

<details>

<summary><code>app/components/hello.css</code></summary>

```css
.container {
  color: magenta;
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 1rem;
}
```

</details>

Next, in the backing class, import the stylesheet and name it `styles`. Store `styles` as a class property so that the template has access.

<details>

<summary><code>app/components/hello.ts</code></summary>

Note, we write the file extension `.css` explicitly.

```ts
import Component from '@glimmer/component';

import styles from './hello.css';

export default class HelloComponent extends Component {
  styles = styles;
}
```

</details>

Display the message and style the container.

<details>

<summary><code>app/components/hello.hbs</code></summary>

```hbs
<div class={{this.styles.container}}>
  Hello world!
</div>
```

</details>

Finally, render the component. Et voilà! ✨

<details>

<summary><code>app/templates/index.hbs</code></summary>

```hbs
<Hello />
```

</details>

> [!NOTE]
> Use the [`{{local}}` helper](../../packages/embroider-css-modules/README.md#helper-local) to apply multiple styles.


### &lt;template&gt; tag

Since we pass `styles` to the template as a class property, it's not possible to style template-only components. (Note, template-only components have the import path `@ember/component/template-only`.)

We can address this issue by using [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports). Replace `hello.{hbs,ts}` with `hello.gts`:

<details>

<summary><code>app/components/hello.gts</code></summary>

```ts
import styles from './hello.css';

<template>
  <div class={{styles.container}}>
    Hello world!
  </div>
</template>
```

</details>


### CSS declaration files

To help TypeScript understand what it means to import a CSS file,

```ts
import styles from './hello.css';
```

and what `styles` looks like, you will need to provide the declaration file `hello.css.d.ts`.

Lucky for you, [`type-css-modules`](../../packages/type-css-modules) can create this file. Write a pre-script as shown below:

```json5
/* package.json */
{
  "scripts": {
    "lint": "concurrently \"pnpm:lint:*(!fix)\" --names \"lint:\"",
    "prelint:types": "type-css-modules --src app",
    "lint:types": "tsc --noEmit" // or "glint"
  }
}
```

Now, when you run `lint`, the `prelint:types` script will create the CSS declaration files, then `lint:types` will type-check the files in your project.

```sh
pnpm lint
```

At any time, you can run `prelint:types` to only create the CSS declaration files.

```sh
pnpm prelint:types
```


### Do the file location and name matter?

A component's template and backing class must have the same name (the related technical terms are [resolve and resolution](https://github.com/ember-cli/ember-resolver)):

- `hello.{hbs,ts}` with the flat component structure
- `hello/index.{hbs,ts}` with the nested component structure

In contrast, the component's stylesheet can have a different name and even live in a different folder. This is because we explicitly import the CSS file in the backing class.

Still, for everyone's sanity, I recommend colocating the stylesheet and providing the same name.

```sh
# Flat component structure
your-ember-app
├── app
│   └── components
│       ├── hello.css
│       ├── hello.css.d.ts
│       ├── hello.hbs
│       └── hello.ts
...
```

```sh
# Nested component structure
your-ember-app
├── app
│   └── components
│       └── hello
│           ├── index.css
│           ├── index.css.d.ts
│           ├── index.hbs
│           └── index.ts
...
```


### Can I use the file extension \*.module.css?

Yes! You can use `*.module.css` to indicate the stylesheets that are for CSS modules. `type-css-modules` will create declaration files with the extension `*.module.css.d.ts`.

```diff
- import styles from './hello.css';
+ import styles from './hello.module.css';
```

> [!NOTE]
> The files `app/assets/app.css` and `app/styles/app.css` keep the extension `*.css`.


### Write tests

In general, I recommend not writing an [`hasClass()`](https://github.com/mainmatter/qunit-dom/blob/master/API.md#hasclass) assertion to test styles.

The presence (or absence) of a class doesn't guarantee that what your user sees is correct and will be in the future. An [`hasStyle()`](https://github.com/mainmatter/qunit-dom/blob/master/API.md#hasstyle) assertion is somewhat better (the assertion is stronger), but may fail due to rounding errors. In general, prefer writing [visual regression tests](https://docs.percy.io/docs/ember). This helps you hide implementation details.

That said, if you _must_ write an `hasClass` assertion, you can get the global class name by importing the stylesheet.

<details>

<summary><code>tests/integration/components/hello-test.ts</code></summary>

For simplicity, other import statements have been hidden.

```ts
import styles from 'your-ember-app/components/hello.css';

module('Integration | Component | hello', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Hello />
    `);

    assert.dom('div').hasClass(styles.container);
  });
});
```

</details>


## Style your first route

To style a route, apply [the ideas that you learned for components](#style-your-first-component).

1. Import a stylesheet in the backing class (the controller) and name it `styles`.
1. Pass `styles` to the template as a class property.
1. Write `this.styles` in the template.


### &lt;template&gt; tag

If you want to avoid controllers, you can use [`ember-route-template`](https://github.com/discourse/ember-route-template) (experimental) and pass `styles` to the template directly.

<details>

<summary><code>app/templates/index.gts</code></summary>

```ts
import Route from 'ember-route-template';

import Hello from '../components/hello';
import styles from './index.css';

export default Route(
  <template>
    <div class={{styles.container}}>
      <Hello />
    </div>
  </template>,
);
```

</details>


### Do the file location and name matter?

A route's template and backing class must have the same name:

- `app/controllers/index.ts`
- `app/templates/index.hbs`

In contrast, the route's stylesheet can have a different name and be placed in any folder (besides `app/styles`). Again, this is because we explicitly import the CSS file in the backing class.

For proximity, I recommend colocating the stylesheet and the controller. Do provide the same name.

```sh
your-ember-app
├── app
│   ├── controllers
│   │   ├── index.css
│   │   ├── index.css.d.ts
│   │   └── index.ts
│   │
│   └── templates
│       └── index.hbs
...
```

With `ember-route-template`, you may colocate the stylesheet and the route template.

```sh
your-ember-app
├── app
│   └── templates
│       ├── index.css
│       ├── index.css.d.ts
│       └── index.gts
...
```
