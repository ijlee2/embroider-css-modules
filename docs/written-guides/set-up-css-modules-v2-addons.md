# Set up CSS modules (v2 addons)

We will use Rollup and PostCSS to implement CSS modules. (If you get lost, you can check [`my-v2-addon`](../my-v2-addon) for reference.)

1. [Install dependencies](#install-dependencies)
1. [Configure Rollup](#configure-rollup)
    - [Update rollup.config.mjs](#update-rollupconfigmjs)
1. [Style your first component](#style-your-first-component)
    - [Glimmer components](#glimmer-components)
    - [&lt;template&gt;-tag components](#template-tag-components)
    - [CSS declaration files](#css-declaration-files)
    - [Do the file location and name matter?](#do-the-file-location-and-name-matter)
    - [Can I use the file extension \*.module.css?](#can-i-use-the-file-extension-modulecss)
    - [Write tests](#write-tests)


## Install dependencies

A "standard" v2 addon, created with [`@embroider/addon-blueprint`](https://github.com/embroider-build/addon-blueprint) or migrated to with [`ember-codemod-v1-to-v2`](https://github.com/ijlee2/ember-codemod-v1-to-v2/), will have these dependencies already.

- `rollup`
- `@rollup/plugin-babel`

For PostCSS, here is what you likely need at minimum.

- `postcss`
- `rollup-plugin-postcss`

Finally, some packages to improve your developer experience (DX).

- [`embroider-css-modules`](../../packages/embroider-css-modules/README.md)<sup>1, 2</sup>
- [`type-css-modules`](../../packages/type-css-modules/README.md)<sup>1</sup>

All in all, here are the commands for installation:

```sh
pnpm install --dev postcss rollup-plugin-postcss type-css-modules
pnpm install embroider-css-modules
```

<sup>1. Needed only if you use the `{{local}}` helper. Add to `dependencies`, not `devDependencies`.</sup>

<sup>2. Install [`embroider-css-modules-temporary`](../../packages/embroider-css-modules-temporary/README.md) instead, if your addon will be consumed by an Ember project that depends on `ember-css-modules`.</sup>


## Configure Rollup

In this step, you will configure `rollup.config.mjs`. Your file should look similar to this starter code.

<details>

<summary>Starter code for <code>rollup.config.mjs</code></summary>

For simplicity, the comments have been hidden.

```js
import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  output: addon.output(),

  plugins: [
    addon.publicEntrypoints([
      'components/**/*.js',
      'index.js',
      'template-registry.js',
    ]),

    addon.appReexports(['components/**/*.js']),

    addon.dependencies(),

    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
    }),

    addon.hbs(),

    addon.keepAssets(['**/*.css']),

    addon.clean(),

    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
      ],
    }),
  ],
};
```

</details>


### Update rollup.config.mjs

Add `rollup-plugin-postcss` before `babel()` (order matters). Then, remove the glob pattern `**/*.css` from `addon.keepAssets()`.

<details>

<summary><code>rollup.config.mjs</code></summary>

```diff
import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import copy from 'rollup-plugin-copy';
+ import postcss from 'rollup-plugin-postcss';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  output: addon.output(),

  plugins: [
    addon.publicEntrypoints([
      'components/**/*.js',
      'index.js',
      'template-registry.js',
    ]),

    addon.appReexports(['components/**/*.js']),

    addon.dependencies(),

+    postcss({
+      autoModules: false,
+      modules: {
+        generateScopedName: 'your-v2-addon__[sha512:hash:base64:5]',
+      },
+    }),
+
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts'],
    }),

    addon.hbs(),

    addon.keepAssets([]),

    addon.clean(),

    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
      ],
    }),
  ],
};
```

</details>

Let's take a closer look at `postcss()`, as you have a few options.

```js
postcss({
  autoModules: false,
  modules: {
    generateScopedName: 'your-v2-addon__[sha512:hash:base64:5]',
  },
})
```

This setup prepends the hash with the package name (e.g. `your-v2-addon`), so that you can identify a style's source when you run the consuming app. A hash collision in the consuming app becomes unlikely, too.

```js
// Styles for src/components/navigation-menu
const styles = {
  'list': 'your-v2-addon__coN6v',
  'link': 'your-v2-addon__ugjOS',
};
```

If you want to debug the addon code, then you may prefer having predictable names:

```js
postcss({
  autoModules: false,
  modules: {
    generateScopedName: 'your-v2-addon__[path][name]__[local]',
  },
})

// Styles for src/components/navigation-menu
const styles = {
  'list': 'your-v2-addon__src-components-navigation-menu__list',
  'link': 'your-v2-addon__src-components-navigation-menu__link',
};
```

Lastly, if you want the simplest option:

```js
postcss({
  modules: true,
})

// Styles for src/components/navigation-menu
const styles = {
  'list': 'navigation-menu_list__gqvTV',
  'link': 'navigation-menu_link__-1OWJJ',
};
```

I recommend the first option, where `generateScopedName` is `<package-name>__[sha512:hash:base64:5]`.


## Style your first component

You can start styling your addon! Let's create a Glimmer component called `<NavigationMenu>` to test CSS modules.

```sh
your-v2-addon
├── src
│   └── components
│       ├── navigation-menu.css
│       ├── navigation-menu.hbs
│       └── navigation-menu.ts
...
```


### Glimmer components

The goal is to render and style a `<nav>`-element that contains links.

<details>

<summary><code>src/components/navigation-menu.hbs</code></summary>

```hbs
<nav aria-label={{@name}}>
  <ul>
    {{#each @menuItems as |menuItem|}}
      <li>
        <LinkTo @route={{menuItem.route}}>
          {{menuItem.label}}
        </LinkTo>
      </li>
    {{/each}}
  </ul>
</nav>
```

</details>

<details>

<summary><code>src/components/navigation-menu.css</code></summary>

```css
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

Next, in the backing class, import the stylesheet and name it `styles`. Store `styles` as a class property so that the template has access.

<details>

<summary><code>src/components/navigation-menu.ts</code></summary>

Note, we write the file extension `.css` explicitly.

```ts
import Component from '@glimmer/component';

import styles from './navigation-menu.css';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {
  styles = styles;
}
```

</details>

Finally, style the links. ✨

<details>

<summary><code>src/components/navigation-menu.hbs</code></summary>

```hbs
<nav aria-label={{@name}}>
  <ul class={{this.styles.list}}>
    {{#each @menuItems as |menuItem|}}
      <li>
        <LinkTo @route={{menuItem.route}} class={{this.styles.link}}>
          {{menuItem.label}}
        </LinkTo>
      </li>
    {{/each}}
  </ul>
</nav>
```

</details>

You can also [apply multiple styles with the `{{local}}` helper](../../packages/embroider-css-modules/README.md#helper-local).


### &lt;template&gt;-tag components

You may have noticed a downside of `embroider-css-modules`. Since we pass `styles` to the template as a class property, it's not possible to style template-only components.

We can address this issue by writing [`<template>`-tag components](https://github.com/ember-template-imports/ember-template-imports).<sup>1</sup> Replace `navigation-menu.{hbs,ts}` with `navigation-menu.gts`:

<details>

<summary><code>src/components/navigation-menu.gts</code></summary>

```ts
import type { TOC } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';

import styles from './navigation-menu.css';

type MenuItem = {
  label: string;
  route: string;
};

interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}

const NavigationMenuComponent: TOC<NavigationMenuSignature> =
  <template>
    <nav aria-label={{@name}}>
      <ul class={{styles.list}}>
        {{#each @menuItems as |menuItem|}}
          <li>
            <LinkTo @route={{menuItem.route}} class={{styles.link}}>
              {{menuItem.label}}
            </LinkTo>
          </li>
        {{/each}}
      </ul>
    </nav>
  </template>

export default NavigationMenuComponent;
```

</details>

<sup>1. You need [`rollup-plugin-glimmer-template-tag`](https://github.com/NullVoxPopuli/rollup-plugin-glimmer-template-tag) to write `*.{gjs,gts}` files in a v2 addon.</sup>


### CSS declaration files

To help TypeScript understand what it means to import a CSS file,

```ts
import styles from './navigation-menu.css';
```

and what `styles` looks like, you will need to provide the declaration file `navigation-menu.css.d.ts`.

Lucky for you, [`type-css-modules`](../../packages/type-css-modules) can create this file. Write a pre-script as shown below:

```json5
/* package.json */
{
  "scripts": {
    "lint": "concurrently \"npm:lint:*(!fix)\" --names \"lint:\"",
    "lint:types": "tsc --noEmit", // or "glint"
    "prelint:types": "type-css-modules --src src"
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

- `navigation-menu.{hbs,ts}`

In contrast, the component's stylesheet can have a different name and even live in a different folder. This is because we explicitly import the CSS file in the backing class.

Still, for everyone's sanity, I recommend colocating the stylesheet and providing the same name.

```sh
your-v2-addon
├── src
│   └── components
│       ├── navigation-menu.css
│       ├── navigation-menu.css.d.ts
│       ├── navigation-menu.hbs
│       └── navigation-menu.ts
...
```


### Can I use the file extension \*.module.css?

Yes! You may use `*.module.css` to indicate the stylesheets that are for CSS modules. `type-css-modules` will create declaration files with the extension `*.module.css.d.ts`.

```diff
- import styles from './navigation-menu.css';
+ import styles from './navigation-menu.module.css';
```


### Write tests

In general, I don't recommend writing an [`hasClass()`](https://github.com/mainmatter/qunit-dom/blob/master/API.md#hasclass) assertion to test styles.

Checking if a class is present doesn't guarantee, what your user sees is correct and will be in the future. An [`hasStyle()`](https://github.com/mainmatter/qunit-dom/blob/master/API.md#hasstyle) assertion is somewhat better (a stronger assertion than `hasClass`) but may fail due to rounding errors. In general, prefer writing [visual regression tests](https://docs.percy.io/docs/ember). This helps you hide any implementation details.

That said, if you _must_ write an `hasClass` assertion, then provide a test helper to hide implementation details.

<details>

<summary>Addon: <code>src/test-support/components/navigation-menu.ts</code></summary>

```ts
import styles from '../../components/navigation-menu.css';

type LocalClassName = keyof typeof styles;

export function getClassForNavigationMenu(
  localClassName: LocalClassName,
): string {
  return styles[localClassName];
}
```

</details>

<details>

<summary>Addon: <code>src/test-support.ts</code></summary>

For convenience, re-export the test helper(s). In `rollup.config.mjs`, don't forget to add `test-support.js` to `addon.publicEntrypoints()`.

```ts
export * from './test-support/components/navigation-menu.ts';
```

</details>

<details>

<summary>Test app: <code>tests/integration/components/navigation-menu-test.ts</code></summary>

For simplicity, other import statements have been hidden.

```ts
import { getClassForNavigationMenu } from 'your-v2-addon/test-support';

module('Integration | Component | navigation-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <NavigationMenu
        @menuItems={{array
          (hash label="Home" route="index")
        }}
      />
    `);

    assert.dom('ul').hasClass(getClassForNavigationMenu('list'));

    assert.dom('a').hasClass(getClassForNavigationMenu('link'));
  });
});
```

</details>
