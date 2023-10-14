# Set up CSS modules (apps)

We will use Webpack and PostCSS to implement CSS modules. (If you get lost, you can check [`my-app`](../my-app) for reference.)

1. [Install dependencies](#install-dependencies)
1. [Configure Webpack](#configure-webpack)
    - [Update ember-cli-build.js](#update-ember-cli-buildjs)
    - [Create postcss.config.js](#create-postcssconfigjs)
1. [Define entry point for CSS](#define-entry-point-for-css)
    - [Create app/assets/app.css](#create-appassetsappcss)
    - [Import app/assets/app.css](#import-appassetsappcss)
1. [Style your first component](#style-your-first-component)
    - [Glimmer components](#glimmer-components)
    - [&lt;template&gt;-tag components](#template-tag-components)
    - [CSS declaration files](#css-declaration-files)
    - [Do the file location and name matter?](#do-the-file-location-and-name-matter)
    - [Can I use the file extension \*.module.css?](#can-i-use-the-file-extension-modulecss)
    - [Write tests](#write-tests)
1. [Style your first route](#style-your-first-route)
    - [Do the file location and name matter?](#do-the-file-location-and-name-matter-1)


## Install dependencies

If you have a new Ember app, you need these dependencies to build the app with Embroider.

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

<sup>1. Needed only if you have a TypeScript project</sup>


## Configure Webpack

In this step, you will configure `ember-cli-build.js` and `postcss.config.js`.

If you have a new Ember app, copy-paste the starter code for `ember-cli-build.js`. The code defines a variable called `options`, which you will update later. (Even if your app already runs with Embroider, it's a good idea to compare your `ember-cli-build.js` to the starter code so that we are on the same page.)

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


### Update ember-cli-build.js

In the variable `options`, define [`cssLoaderOptions`, `publicAssetURL`, and `webpackConfig` ](https://github.com/embroider-build/embroider/blob/main/packages/webpack/src/options.ts) for Embroider.

<details>

<summary><code>ember-cli-build.js</code></summary>

For simplicity, only `options` is shown. (The rest of the code remains the same.)

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

⚠️ If your app belongs to a monorepo, you must provide the relative path (from the workspace root to the app) to `hostAppLocation`. This way, Webpack can distinguish the CSS files from your app (local) from those from an addon in the monorepo (global).

```js
function mode(resourcePath) {
  // If your app is located in `apps/your-ember-app`
  const hostAppLocation = `apps/your-ember-app/node_modules/.embroider/rewritten-app`;

  return resourcePath.includes(hostAppLocation) ? 'local' : 'global';
}
```


### Create postcss.config.js

List the PostCSS plugins that your app depends on.

<details>

<summary><code>postcss.config.js</code></summary>

List the `autoprefixer` plugin.

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

<details>

<summary><code>.eslintrc.js</code></summary>

Find the override for Node files. Add `postcss.config.js` to the list of files.

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


## Define entry point for CSS

For CSS modules to work, we need JS files to be able to import a CSS file.

Unfortunately, in Ember v4.12, we can't import CSS files located in `app/styles`. This somewhat limits where we can store files (e.g. stylesheets for routes). We can't delete `app/styles` either, as `ember-cli` expects [`app/styles/app.css`](https://cli.emberjs.com/release/advanced-use/stylesheets/) to exist.


### Create app/assets/app.css

Given the constraints above, let's define the entry point for CSS in a new folder, namely `app/assets/app.css`. (The location and name of the file do not matter.)

<details>

<summary><code>app/assets/app.css</code></summary>

Here is the default file from `ember-cli`.

```css
/* Ember supports plain CSS out of the box. More info: https://cli.emberjs.com/release/advanced-use/stylesheets/ */
```

</details>

This file serves the same purpose as `app/styles/app.css`. That is, in `app/assets/app.css`, you can import stylesheets and define the global styles for type selectors (e.g. `h1`, `h2`). 


### Import app/assets/app.css

Once the file is created, import it in `app/app.ts`.

<details>

<summary><code>app/app.ts</code></summary>

```ts
import './assets/app.css';

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

By importing the file in `app/app.ts`, we can ensure the load order in production. Webpack injects `<link>` tags in the order in which they are imported, and we want our entry point to be the first. (paraphrased from [ember-modern-css](https://github.com/evoactivity/ember-modern-css#importing-css))


## Style your first component

You can start styling your app! Let's create a Glimmer component to test CSS modules.

```sh
ember g component hello-world -gc
```

While `ember-cli` can take care of the template and the backing class, you will need to manually create the stylesheet (for now).

```sh
touch app/components/hello-world.css
```


### Glimmer components

The goal is to render the text `Hello world!` in a `<div>`-container. In the stylesheet, define a class selector named `.container`.

<details>

<summary><code>app/components/hello-world.css</code></summary>

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

<summary><code>app/components/hello-world.ts</code></summary>

Note, we write the file extension `.css` explicitly.

```ts
import Component from '@glimmer/component';

import styles from './hello-world.css';

export default class HelloWorldComponent extends Component {
  styles = styles;
}
```

</details>

Display the message and style the `<div>`-container.

<details>

<summary><code>app/components/hello-world.hbs</code></summary>

```hbs
<div class={{this.styles.container}}>
  Hello world!
</div>
```

</details>

Finally, render the component somewhere. Et voilà! ✨

<details>

<summary><code>app/templates/index.hbs</code></summary>

```hbs
<HelloWorld />
```

</details>

You can also [apply multiple styles with the `{{local}}` helper](../../packages/embroider-css-modules/README.md#helper-local).


### &lt;template&gt;-tag components

You may have noticed a downside of `embroider-css-modules`. Since we pass `styles` to the template as a class property, it's not possible to style template-only components.

We can address this issue by writing [`<template>`-tag components](https://github.com/ember-template-imports/ember-template-imports). Replace `hello-world.{hbs,ts}` with `hello-world.gts`:

<details>

<summary><code>app/components/hello-world.gts</code></summary>

```ts
import styles from './hello-world.css';

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
import styles from './hello-world.css';
```

and what `styles` looks like, you will need to provide the declaration file `hello-world.css.d.ts`.

Lucky for you, [`type-css-modules`](../../packages/type-css-modules) can create this file. Write a pre-script as shown below:

```json5
/* package.json */
{
  "scripts": {
    "lint": "concurrently \"npm:lint:*(!fix)\" --names \"lint:\"",
    "lint:types": "tsc --noEmit", // or "glint"
    "prelint:types": "type-css-modules --src app"
  }
}
```

Now, when you run `lint`, the `prelint:types` script will create the CSS declaration file(s), then `lint:types` will type-check the files in your project.

```sh
pnpm lint
```

If the `lint` script takes too long to run, you can run just `prelint:types` to create the declaration files.

```sh
pnpm prelint:types
```


### Do the file location and name matter?

In Ember v4.12, a component's template and backing class must have the same name (the related technical terms are [resolve and resolution](https://github.com/ember-cli/ember-resolver)):

- `hello-world.{hbs,ts}` with the flat component structure
- `hello-world/index.{hbs,ts}` with the nested component structure

In contrast, the component's stylesheet can have a different name and even live in a different folder. This is because we explicitly import the CSS file in the backing class.

Still, for everyone's sanity, I recommend colocating the stylesheet and providing the same name.

```sh
# Flat component structure
your-ember-app
├── app
│   └── components
│       ├── hello-world.css
│       ├── hello-world.css.d.ts
│       ├── hello-world.hbs
│       └── hello-world.ts
...
```

```sh
# Nested component structure
your-ember-app
├── app
│   └── components
│       └── hello-world
│           ├── index.css
│           ├── index.css.d.ts
│           ├── index.hbs
│           └── index.ts
...
```


### Can I use the file extension \*.module.css?

Yes! You may use `*.module.css` to indicate the stylesheets that are for CSS modules. `type-css-modules` will create declaration files with the extension `*.module.css.d.ts`.

```diff
- import styles from './hello-world.css';
+ import styles from './hello-world.module.css';
```

⚠️ The files `app/assets/app.css` and `app/styles/app.css` keep the extension `*.css`.


### Write tests

In general, I don't recommend writing an [`hasClass()`](https://github.com/mainmatter/qunit-dom/blob/master/API.md#hasclass) assertion to test styles.

Checking if a class is present doesn't guarantee, what your user sees is correct and will be in the future. An [`hasStyle()`](https://github.com/mainmatter/qunit-dom/blob/master/API.md#hasstyle) assertion is somewhat better (a stronger assertion than `hasClass`) but may fail due to rounding errors. In general, prefer writing [visual regression tests](https://docs.percy.io/docs/ember). This helps you hide any implementation details.

That said, if you _must_ write an `hasClass` assertion, you can get the global class name by importing the stylesheet.

<details>

<summary><code>tests/integration/components/hello-world-test.ts</code></summary>

For simplicity, other import statements have been hidden.

```ts
import styles from 'your-ember-app/components/hello-world.css';

module('Integration | Component | hello-world', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <HelloWorld />
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


### Do the file location and name matter?

In Ember v4.12, a route's template and backing class must have the same name:

- `app/controllers/index.ts`
- `app/templates/index.hbs`

In contrast, the route's stylesheet can have a different name and be placed in any folder (besides `app/styles`). Again, this is because we explicitly import the CSS file in the backing class.

For proximity, I recommend colocating the stylesheet and the controller and providing the same name.

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
