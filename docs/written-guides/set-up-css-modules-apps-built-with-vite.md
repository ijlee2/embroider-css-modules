# Set up CSS modules (apps built with Vite)

We will use [Vite's built-in support for CSS modules](https://vitejs.dev/guide/features#css-modules).

1. [Install dependencies](#install-dependencies)
1. [Configure Vite](#configure-vite)
    - [Set up PostCSS](#set-up-postcss)
1. [Style your first component](#style-your-first-component)
1. [Style your first route](#style-your-first-route)

> [!NOTE]
> If you get lost, you can check how [`embroider-css-modules-vite-app`](https://github.com/ijlee2/embroider-css-modules-vite-app) is set up.


## Install dependencies

You will need these dependencies to build an Embroider app with Vite.

- `@embroider/compat`
- `@embroider/core`
- `@embroider/vite`
- `vite`

For PostCSS, here is what you likely need at minimum.

- `autoprefixer`

Finally, some packages to improve your developer experience (DX).

- [`embroider-css-modules`](../../packages/embroider-css-modules/README.md)
- [`type-css-modules`](../../packages/type-css-modules/README.md)<sup>1</sup>

All in all, here's a one-line command for installation:

```sh
pnpm install --dev \
  @embroider/compat @embroider/core @embroider/vite vite \
  autoprefixer \
  embroider-css-modules type-css-modules
```

<sup>1. Needed only if you have a TypeScript project.</sup>


## Configure Vite

In this step, you will update one file: `vite.config.mjs`.

Vite supports CSS modules out of the box, so we just need to pass the option [`css.modules`](https://vitejs.dev/config/shared-options.html#css-modules).

<details>

<summary><code>vite.config.mjs</code></summary>

```diff
import {
  compatPrebuild,
  hbs,
  optimizeDeps,
  resolver,
  scripts,
  templateTag,
} from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const root = 'node_modules/.embroider/rewritten-app';

export default defineConfig({
+   css: {
+     modules: {
+       generateScopedName: '[sha512:hash:base64:5]',
+     },
+   },
  root,
  esbuild: false,
  cacheDir: resolve('node_modules', '.vite'),
  plugins: [
    hbs(),
    templateTag(),
    scripts(),
    resolver(),
    compatPrebuild(),
    babel({
      babelHelpers: 'runtime',
      extensions: ['.gjs', '.js', '.hbs', '.ts', '.gts'],
    }),
  ],
  optimizeDeps: optimizeDeps(),
  server: {
    port: 4200,
    watch: {
      ignored: [`!**/${root}/**`],
    },
  },
  build: {
    outDir: resolve(process.cwd(), 'dist'),
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        tests: resolve(root, 'tests/index.html'),
      },
    },
  },
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

<summary><code>app/components/hello.ts</code></summary>

Note, we write the file extension `.module.css` explicitly.

```ts
import Component from '@glimmer/component';

import styles from './hello.module.css';

export default class HelloComponent extends Component {
  styles = styles;
}
```

</details>

<details>

<summary><code>app/components/hello.hbs</code></summary>

```hbs
<div class={{this.styles.container}}>
  Hello world!
</div>
```

</details>

> [!NOTE]
> `type-css-modules` will create declaration files with the extension `*.module.css.d.ts`. The configuration remains the same.


## Style your first route

Again, the only difference from [an app built with Webpack](./set-up-css-modules-apps-built-with-webpack.md#style-your-first-route) is the file extension `*.module.css`.
