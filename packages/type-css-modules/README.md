[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# type-css-modules

_Generate declaration files for CSS modules_


## What is it?

The package provides accurate types for CSS module files. It's designed with Ember projects in mind, but can be used with any JavaScript framework and build tool.


## Installation

```sh
pnpm add -D type-css-modules
```

Ensure that CSS declaration files exist before types are checked. For example, you can write a [pre-script](https://docs.npmjs.com/cli/v9/using-npm/scripts#pre--post-scripts).

```json5
/* package.json */
{
  "scripts": {
    "prelint:types": "type-css-modules <arguments>",
    "lint:types": "ember-tsc --noEmit" // or "glint"
  },
  "devDependencies": {
    "type-css-modules": "...",
    "typescript": "..."
  }
}
```


### Arguments

You must pass `--src` to indicate the location of your CSS module files.

```sh
type-css-modules --src app
```

You can pass multiple values or use glob patterns to specify multiple locations.

```sh
type-css-modules --src app/components app/templates
type-css-modules --src "app/{components,controllers,templates}"
```

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
type-css-modules --root <path/to/your/project>
```

</details>


### Use Prettier?

You can run into a couple of issues when `prettier` and `type-css-modules` run side-by-side.

`type-css-modules` uses quotation marks in declaration files so that we can always use class selector names as object keys. On the other hand, `prettier` removes quotation marks when it deems unnecessary. To separate formatting concerns, set `quoteProps: 'preserve'` for `*.css.d.ts` files:

```js
/* prettier.config.mjs */
export default {
  overrides: [
    {
      files: '*.css.d.ts',
      options: {
        quoteProps: 'preserve',
      },
    },
  ],
};
```

Furthermore, if you run `prettier` as a standalone tool (i.e. not as a linter plugin), you can run into a concurrency issue because `type-css-modules` deletes declaration files before creating new ones. Make the two independent by adding `*.css.d.ts` to `.prettierignore`.


### Can I use the file extension \*.module.css?

Yes! You may use `*.module.css` to indicate the stylesheets that are for CSS modules. `type-css-modules` will create declaration files with the extension `*.module.css.d.ts`.

The [Prettier configuration](#use-prettier) (shown above) can remain as is.


## Limitations

To reduce complexity, `type-css-modules` expects you to follow the conventions of `embroider-css-modules`:

- Give the local scope to the styles that you own<sup>1</sup>
- Avoid nesting styles<sup>2</sup>
- Use the default import to import styles

Here are some examples that meet the syntax requirements.

<details>

<summary>Ember: Glimmer component</summary>

```css
/* app/components/ui/page.css */
.container {
  display: grid;
  grid-template-areas:
    "header"
    "body";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: calc(100% - 3em);
  overflow-y: auto;
  padding: 1.5rem 1rem;
  scrollbar-gutter: stable;
}

.header {
  grid-area: header;
}

.body {
  grid-area: body;
}
```

```hbs
{{! app/components/ui/page.hbs }}
<div class={{local this.styles "container"}}>
  <h1 class={{this.styles.header}}>
    {{@title}}
  </h1>

  <div class="{{this.styles.body}}">
    {{yield}}
  </div>
</div>
```

```ts
/* app/components/ui/page.ts */
import Component from '@glimmer/component';

import styles from './page.css';

export default class UiPageComponent extends Component {
  styles = styles;
}
```

</details>

<details>

<summary>Ember: <code>&lt;template&gt;</code> tag</summary>

```ts
/* app/components/ui/page.gts */
import { local } from 'embroider-css-modules';

import styles from './page.css';

<template>
  <div class={{local styles "container"}}>
    <h1 class={{styles.header}}>
      {{@title}}
    </h1>

    <div class="{{styles.body}}">
      {{yield}}
    </div>
  </div>
</template>
```

</details>

And some counterexamples (what not to do):

<details>

<summary>Don't use the <code>:local()</code> pseudo-class selector</summary>

```css
/* app/components/ui/page.css */
:local(.container) {
  display: grid;
  grid-template-areas:
    "header"
    "body";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: calc(100% - 3em);
  overflow-y: auto;
  padding: 1.5rem 1rem;
  scrollbar-gutter: stable;
}

:local(.header) {
  grid-area: header;
}

:local(.body) {
  grid-area: body;
}
```

</details>

<details>

<summary>Don't nest styles</summary>

```css
/* app/components/ui/page.css */
.container {
  display: grid;
  grid-template-areas:
    "header"
    "body";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  height: calc(100% - 3em);
  overflow-y: auto;
  padding: 1.5rem 1rem;
  scrollbar-gutter: stable;

  .header {
    grid-area: header;
  }

  .body {
    grid-area: body;
  }
}
```

</details>

<details>

<summary>Don't use named imports to import styles</summary>

```ts
/* app/components/ui/page.gts */
import { container, header, body } from './page.css';

<template>
  <div class={{container}}>
    <h1 class={{header}}>
      {{@title}}
    </h1>

    <div class="{{body}}">
      {{yield}}
    </div>
  </div>
</template>
```

</details>

<sup>1. With `webpack`, for example, you can configure [`mode`](https://webpack.js.org/loaders/css-loader/#mode) to be a function that returns `'local'` or `'global'`. In stylesheets, you can use the `:global()` pseudo-class selector to refer to "things from outside."</sup>

<sup>2. [CSS nesting is in spec](https://www.w3.org/TR/css-nesting-1/). To reduce maintenance cost, `type-css-modules` will leave it up to `css-tree` to parse nested styles (see [issue #210](https://github.com/csstree/csstree/issues/210)).


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
