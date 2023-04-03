[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules

_CSS modules for Embroider + TypeScript projects_


## Features

`embroider-css-modules` provides tools to help you implement CSS modules. It supports [`Glint`](https://typed-ember.gitbook.io/glint/) and [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports).


## Installation

```sh
ember install embroider-css-modules
```

<details>
<summary>Use Glint or <code>&lt;template&gt;</code> tag? ✨</summary>

- If you are using `<template>` tag, you are good to go! Use the named import to consume things.

    ```ts
    /* app/components/ui/page.gts */
    import { localClass } from 'embroider-css-modules';

    import styles from './page.css';

    <template>
      <div class={{localClass styles "container"}}>
        <h1 class={{styles.header}}>
          {{@title}}
        </h1>

        <div class={{styles.body}}>
          {{yield}}
        </div>
      </div>
    </template>
    ```

- Otherwise, update your template registry to extend this addon's. Check the [Glint documentation](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) for more information.

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

</details>


## API

The addon provides 1 helper:

- `{{local-class}}`

Expand the items below to learn more about the API. Throughout the section, you can assume that there is a `styles` object, which maps local class names to global ones.

```ts
// An example
const styles = {
  'container': 'container-hashed',
  'is-inline': 'is-inline-hashed',
  'is-wide': 'is-wide-hashed',
  'no-feedback': 'no-feedback-hashed',
};
```

<details>
<summary><code>{{local-class}}</code></summary>

### Why use it?

The `{{local-class}}` helper is useful when there are multiple classes to consider.

```hbs
{{! Before: app/components/ui/form/field.hbs }}
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

```hbs
{{! After: app/components/ui/form/field.hbs }}
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

### Arguments

The `{{local-class}}` helper uses positional arguments so that, when there is a type error, the message from TypeScript is easy to understand.

Pass the `styles` object first, then the local class name(s).

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

### Outputs

The `{{local-class}}` helper returns a concatenated string. The string lists the global class names in the same order as the local ones.

</details>


## Compatibility

* `ember-auto-import@v2`<sup>1</sup>
* Ember.js v4.4 or above<sup>2</sup>
* Node.js v16 or above

<sup>1. Until you can adopt `ember-auto-import@v2`, I recommend using [`ember-css-modules`](https://github.com/salsify/ember-css-modules) to do CSS modules.</sup>

<sup>2. Older versions may work but won't be supported.</sup>


## License

This project is licensed under the [MIT License](LICENSE.md).
