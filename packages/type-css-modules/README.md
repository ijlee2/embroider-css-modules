[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# type-css-modules

_Generate declaration files for CSS modules_ (independent of JavaScript framework)

1. [Why use this package?](#why-use-this-package)
1. [How to use this package?](#how-to-use-this-package)
    - [Arguments](#arguments)
    - [Use Prettier?](#use-prettier)
    - [Can I use the file extension `*.module.css`?](#can-i-use-the-file-extension-modulecss)
1. [Limitations](#limitations)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## Why use this package?

The type definition from [`@types/css-modules`](https://www.npmjs.com/package/@types/css-modules) is easy for humans to understand, but not specific enough for programs:

```ts
declare module '*.css' {
  const styles: Record<string, string>;

  export default styles;
}
```

First, you will run into poor developer experience (DX) when [`noPropertyAccessFromIndexSignature`](https://www.typescriptlang.org/tsconfig#noPropertyAccessFromIndexSignature) is enabled.

<details>

<summary>Ember: Glimmer component</summary>

```hbs
{{! app/components/ui/page.hbs }}
{{! This should work, but results in an error. }}
<div class={{this.styles.container}}>
  {{!-- ↳ Property 'container' comes from an index signature, so it must be accessed with {{get ... 'container'}}. --}}
</div>

{{! A workaround }}
<div class={{get this.styles "container"}}>
</div>
```

</details>

<details>

<summary>Ember: <code>template</code>-tag component</summary>

```ts
/* app/components/ui/page.gts */
import styles from './page.css';

<template>
  // This should work, but results in an error.
  <div class={{styles.container}}>
    // ↳ Property 'container' comes from an index signature, so it must be accessed with ['container'].
  </div>

  // A workaround
  <div class={{styles['container']}}>
  </div>
</template>
```

</details>

Second, the loose definition may be incompatible with libraries that provide types (e.g. [`qunit-dom`](https://github.com/mainmatter/qunit-dom)). You will end up overusing the non-null assertion operator `!`.

<details>

<summary>Ember: Rendering test</summary>

```ts
/* tests/integration/components/ui/page-test.ts */
import styles from 'app/components/ui/page.css';

// This should work, but results in an error.
assert
  .dom('[data-test-container]')
  .hasClass(styles.container);
    // ↳ Argument of type 'string | undefined' is not assignable to parameter of type 'string | RegExp'.
    //   Type 'undefined' is not assignable to 'string | RegExp'.

// A workaround
assert
  .dom('[data-test-container]')
  .hasClass(styles['container']!);
```

</details>

When you provide accurate types, libraries (e.g. [`Glint`](https://typed-ember.gitbook.io/glint/), [`embroider-css-modules`](https://github.com/ijlee2/embroider-css-modules/tree/main/embroider-css-modules)) can improve your DX in return. You can catch typos and find unused styles early.

<details>

<summary>Ember: Glimmer component</summary>

```hbs
{{! app/components/ui/page.hbs }}
<div class={{local-class this.styles "ontainer"}}> {{! ⚠️ Property 'ontainer' is missing }}
  <h1 class={{this.styles.head}}> {{! ⚠️ Property 'head' does not exist }}
    {{@title}}
  </h1>

  <div class={{local-class this.style "body"}}> {{! ⚠️ Did you mean 'styles'? }}
    {{yield}}
  </div>
</div>
```

</details>


## How to use this package?

Option 1 (recommended). Install `type-css-modules` as a development dependency. Ensure that the CSS declaration files exist before checking the types; for example, you can write a [pre-script](https://docs.npmjs.com/cli/v9/using-npm/scripts#pre--post-scripts).

```json5
/* package.json */
{
  "scripts": {
    "lint:types": "tsc --noEmit",
    "prelint:types": "type-css-modules <arguments>"
  },
  "devDependencies": {
    "type-css-modules": "...",
    "typescript": "..."
  }
}
```

Option 2 (one-time use). Use `npx` to run `type-css-modules`.

```sh
cd <path/to/your/project>
npx type-css-modules <arguments>
```


### Arguments

You must pass `--src` to indicate the location(s) of your CSS files.


```sh
# One source directory
type-css-modules --src app

# Multiple source directories
type-css-modules --src app/components app/controllers
```

<details>
<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx type-css-modules --root=<path/to/your/project>
```

</details>


### Use Prettier?

`type-css-modules` adds quotation marks in declaration files. This way, the names of CSS class selectors can always be used as object keys.

To separate formatting concerns, configure Prettier to handle `*.css.d.ts` files differently.

```js
/* .prettierrc.js */
module.exports = {
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


### Can I use the file extension \*.module.css?

Good news! You can continue to use `*.module.css` to indicate the stylesheets that are for CSS modules.

`type-css-modules` will create declaration files with the extension `*.module.css.d.ts`. The [Prettier configuration](#use-prettier) shown above can remain as is.


## Limitations

To reduce complexity, `type-css-modules` assumes that you will follow the conventions of `embroider-css-modules`:

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
<div class={{local-class this.styles "container"}}>
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

<summary>Ember: <code>&lt;template&gt;</code>-tag component</summary>

```ts
/* app/components/ui/page.gts */
import { localClass } from 'embroider-css-modules';

import styles from './page.css';

<template>
  <div class={{localClass styles "container"}}>
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

Lastly, some counterexamples (what not to do):

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

<sup>1. With `webpack`, for example, you can configure [`mode`](https://webpack.js.org/loaders/css-loader/#mode) to be a function that returns `'local'` or `'global'`. In CSS module stylesheets, you can use the `:global()` pseudo-class selector to refer to "things from outside."</sup>

<sup>2. [CSS nesting is in spec](https://www.w3.org/TR/css-nesting-1/). Once it is official, `type-css-modules` will leave it up to [`CSSTree`](https://github.com/csstree/csstree) to parse nested styles.


## Compatibility

* Node.js v16 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
