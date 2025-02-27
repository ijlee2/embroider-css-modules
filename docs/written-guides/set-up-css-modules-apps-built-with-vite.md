# Set up CSS modules (apps built with Vite)

Apps built with Vite are called "v2 apps." The blueprint for v2 apps are still in development, so this page will stay away from any blueprint details (e.g. Embroider dependencies).

Good news is, [Vite provides CSS modules out of the box](https://vitejs.dev/guide/features#css-modules). We just need to configure our app a bit.

1. [Install dependencies](#install-dependencies)
1. [Configure Vite](#configure-vite)
    - [Set up PostCSS](#set-up-postcss)
1. [Style your first component](#style-your-first-component)
1. [Style your first route](#style-your-first-route)

> [!NOTE]
> If you get lost, you can check how [`my-v2-app`](../my-v2-app) is set up.


## Install dependencies

You can install these packages to improve your developer experience (DX).

- [`embroider-css-modules`](../../packages/embroider-css-modules/README.md)
- [`type-css-modules`](../../packages/type-css-modules/README.md)<sup>1</sup>

Here's a one-line command for installation:

```sh
pnpm install --dev embroider-css-modules type-css-modules
```

<sup>1. Needed only if you have a TypeScript project.</sup>


## Configure Vite

In this step, you will update one file: `vite.config.mjs`. Pass the option [`css.modules`](https://vitejs.dev/config/shared-options.html#css-modules).

<details>

<summary><code>vite.config.mjs</code></summary>

```diff
import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
+   css: {
+     modules: {
+       generateScopedName: 'your-ember-app__[sha512:hash:base64:5]',
+     },
+   },
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
```

</details>

> [!NOTE]
> You have a few options for `generateScopedName`. See [Set up CSS modules (v2 addons) - Configure hashing](./set-up-css-modules-v2-addons.md#configure-hashing).


### Set up PostCSS

[Vite supports PostCSS](https://vitejs.dev/guide/features#postcss). To set up PostCSS plugins like `autoprefixer`, see [Set up CSS modules (apps built with Webpack) - Set up PostCSS](./set-up-css-modules-apps-built-with-webpack.md#set-up-postcss).


## Style your first component

We can use `embroider-css-modules` in the same way as we would in [an app built with Webpack](./set-up-css-modules-apps-built-with-webpack.md#style-your-first-component), with one exception:

> [!IMPORTANT]
> Vite requires CSS module files to have the file extension `*.module.css`.

Hence, when we create the component `<Hello>`, we name the stylesheet `hello.module.css` instead:

<details>

<summary><code>app/components/hello.module.css</code></summary>

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

<details>

<summary><code>app/components/hello.gts</code></summary>

Note, we write the file extension `.module.css` explicitly.

```ts
import styles from './hello.module.css';

<template>
  <div class={{styles.container}}>
    Hello world!
  </div>
</template>
```

</details>


## Style your first route

Again, the only difference from [an app built with Webpack](./set-up-css-modules-apps-built-with-webpack.md#style-your-first-route) is the file extension `*.module.css`.
