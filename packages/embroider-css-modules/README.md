[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules

_CSS modules for Embroider projects_

1. [What is it?](#what-is-it)
1. [Installation](#installation)
1. [API](#api)
    - [Helper: `{{local-class}}`](#helper-local-class)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## What is it?

`embroider-css-modules` provides a set of **tools and conventions** to help you implement [CSS modules](https://github.com/css-modules/css-modules). It is compatible with "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [TypeScript](https://www.typescriptlang.org/docs/) + [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)


## Installation

```sh
ember install embroider-css-modules
```

<details>
<summary>Use Glint or <code>&lt;template&gt;</code> tag? ✨</summary>

- Update your template registry to extend this addon's. Check the [Glint documentation](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) for more information.

    ```ts
    /* types/global.d.ts */

    import '@glint/environment-ember-loose';

    import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';

    declare module '@glint/environment-ember-loose/registry' {
      export default interface Registry extends EmbroiderCssModulesRegistry, /* other addon registries */ {
        // local entries
      }
    }
    ```

- If you are using `<template>` tag, you are good to go! Use the named import to consume things.

    ```css
    /* app/components/hello-world.css */
    .container {
      padding: 1rem;
    }
    ```

    ```ts
    /* app/components/hello-world.gts */
    import { localClass } from 'embroider-css-modules';

    import styles from './hello-world.css';

    <template>
      <div class={{localClass styles "container"}}>
        Hello world!
      </div>
    </template>
    ```

</details>


## API

The addon provides 1 helper:

- `{{local-class}}`

Throughout the section, you can assume that there is a `styles` object, which maps local class names to global ones.

```ts
// An example
const styles = {
  'container': 'lzeQ4',
  'is-inline': 'mJGCE',
  'is-wide': '_2lPSR',
  'no-feedback': 'YpQbt',
};
```


### Helper: {{local-class}}

#### Why use it?

The `{{local-class}}` helper is useful when you want to apply multiple styles.

<details>

<summary>Before: With the <code>{{concat}}</code> helper</summary>

```hbs
{{! app/components/ui/form/field.hbs }}
<div
  class={{concat
    this.styles.container
    " "
    (if @isInline this.styles.is-inline)
    " "
    (if @isWide this.styles.is-wide)
    " "
    (unless @errorMessage this.styles.no-feedback)
  }}
>
  ...
</div>
```

</details>

<details>

<summary>After: With the <code>{{local-class}}</code> helper</summary>

```hbs
{{! app/components/ui/form/field.hbs }}
<div
  class={{local-class
    this.styles
    "container"
    (if @isInline "is-inline")
    (if @isWide "is-wide")
    (unless @errorMessage "no-feedback")
  }}
>
  ...
</div>
```

</details>

To apply multiple styles when a conditional statement holds, use the `{{array}}` helper.

<details>

<summary>Example</summary>

```hbs
{{! app/templates/products.hbs }}
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


#### Arguments

The `{{local-class}}` helper uses positional arguments so that styles are applied in sequence. Pass the `styles` object first, then the local class name(s).


#### Outputs

The `{{local-class}}` helper returns a concatenated string. The string lists the global class names in the same order as the local ones.


## Compatibility

- `ember-auto-import@v2`<sup>1</sup>
- Ember.js v4.4 or above<sup>2</sup>
- Node.js v16 or above

<sup>1. `embroider-css-modules` is a v2 addon. This means, your project must have `ember-auto-import@v2`. If you are momentarily stuck with `ember-auto-import@v1`, you can use [`ember-css-modules`](https://github.com/salsify/ember-css-modules) to implement CSS modules.</sup>

<sup>2. Older versions may work but won't be supported.</sup>


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
