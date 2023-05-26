# Set up CSS modules (v2 addons)

We will use Rollup and PostCSS to implement CSS modules. (If you get lost, you can check [`sample-v2-addon`](../sample-v2-addon) for reference.)

1. [Install dependencies](#install-dependencies)
1. [Configure Rollup](#configure-rollup)
    - [Update rollup.config.mjs](#update-rollupconfigmjs)
    - [Update package.json?](#update-packagejson)
1. [Style your first component](#style-your-first-component)
    - [Glimmer components](#glimmer-components)
    - [&lt;template&gt;-tag components](#template-tag-components)
    - [Do the file location and name matter?](#do-the-file-location-and-name-matter)
    - [CSS declaration files](#css-declaration-files)


## Install dependencies

A "standard" v2 addon, created with [`@embroider/addon-blueprint`](https://github.com/embroider-build/addon-blueprint) or migrated to with [`ember-codemod-v1-to-v2`](https://github.com/ijlee2/ember-codemod-v1-to-v2/), will have these dependencies already.

- `rollup`
- `rollup-plugin-ts`<sup>1</sup>

For PostCSS, here is what you likely need at minimum.

- `postcss`
- `rollup-plugin-postcss`

Finally, some packages to improve your developer experience (DX).

- [`embroider-css-modules`](../../packages/embroider-css-modules/README.md)<sup>2, 3</sup>
- [`type-css-modules`](../../packages/type-css-modules/README.md)<sup>1</sup>

All in all, here are the commands for installation:

```sh
pnpm install --dev postcss rollup-plugin-postcss type-css-modules
pnpm install embroider-css-modules
```

<sup>1. Needed only if you have a TypeScript project.</sup>

<sup>2. Needed only if you use the `{{local-class}}` helper. Add to `dependencies`, not `devDependencies`.</sup>

<sup>3. Install [`embroider-css-modules-temporary`](../../packages/embroider-css-modules-temporary/README.md) instead, if your addon will be consumed by an Ember project that depends on `ember-css-modules`.</sup>


## Configure Rollup

In this step, you will configure `rollup.config.mjs`. Your file should look similar to this starter code.

<details>

<summary>Starter code for <code>rollup.config.mjs</code></summary>

For simplicity, the comments have been hidden.

```js
import { Addon } from '@embroider/addon-dev/rollup';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-ts';

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

    // Alternatively, babel(), if you have a JavaScript project
    typescript({
      transpiler: 'babel',
      browserslist: false,
      transpileOnly: false,
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

Add `rollup-plugin-postcss` before `rollup-plugin-ts` (order matters). Then, remove the glob pattern `**/*.css` from `addon.keepAssets()`.

<details>

<summary><code>rollup.config.mjs</code></summary>

```js
import { Addon } from '@embroider/addon-dev/rollup';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-ts';

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

    postcss({
      autoModules: false,
      modules: {
        generateScopedName: 'your-v2-addon__[sha512:hash:base64:5]',
      },
    }),

    typescript({
      transpiler: 'babel',
      browserslist: false,
      transpileOnly: false,
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

If you want to debug the addon code, or you _must_ test the addon's styles using the [`hasClass()`](https://github.com/mainmatter/qunit-dom/blob/master/API.md#hasclass) assertion (rather than writing a visual regression test), then you may prefer having predictable names:

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

Lastly, if you want the simplest option that "just works,"

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


### Update package.json?

⚠️ This section shows an approach that is experimental and not suited for production. Further iterations are needed.

The goal is to allow consuming projects to import an addon's stylesheet. For example, they may want to compose styles or use the `hasClass()` assertion to test styles.

```ts
import navigationMenuStyles from 'your-v2-addon/components/navigation-menu.css';
```

Now, the addon must help resolve the import path. We can do so by updating the `exports` field in `package.json`:

```json5
/* package.json */
{
  "exports": {
    ".": "./dist/index.js",
    "./*.css": {
      "types": "./src/*.css.d.ts",
      "default": "./src/*.css"
    },
    "./*": {
      "types": "./dist/*.d.ts",
      "default": "./dist/*.js"
    },
    "./addon-main.js": "./addon-main.cjs"
  },
}
```

Note that `./*.css` appears before `./*`.

❓ What's strange (and possibly incorrect) is, `types` and `default` point to `src` for `./*.css`. Recall that we removed `**/*.css` from `addon.keepAssets()` (otherwise, the configuration for `postcss()` wouldn't work), so `dist` doesn't have `*.css` files.

❓ Even when we define `./*.css` in `exports`, `navigationMenuStyles` ends up with the value of an empty object `{}`.

(Ideas and contributions are welcome!)


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

You can also [apply multiple styles with the `{{local-class}}` helper](../../packages/embroider-css-modules/README.md#api).


### &lt;template&gt;-tag components

You may have noticed a downside of `embroider-css-modules`. Since we pass `styles` to the template as a class property, it's not possible to style template-only components.

We can easily address this issue by writing [`<template>`-tag components](https://github.com/ember-template-imports/ember-template-imports).<sup>1</sup> Replace `navigation-menu.{hbs,ts}` with `navigation-menu.gts`:

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

<sup>1. Currently, you need to install [`rollup-plugin-glimmer-template-tag`](https://github.com/NullVoxPopuli/rollup-plugin-glimmer-template-tag) to write `*.{gjs,gts}` files in a v2 addon.</sup>


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

Now, when you run the `lint` script, the `prelint:types` script will create the CSS declaration file(s), then `lint:types` will type-check the files in your project.

```sh
pnpm lint
```

If the `lint` script takes long to run, you can run just `prelint:types` to create the declaration files.

```sh
pnpm prelint:types
```
