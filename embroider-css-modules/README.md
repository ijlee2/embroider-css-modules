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
      <div class={{styles.container}}>
        <h1>
          {{@title}}
        </h1>

        <div class={{localClass styles "body"}}>
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

Expand the items below to learn more about the API.

<details>
<summary><code>{{local-class}}</code></summary>

Suppose there is a `styles` object that maps local class names to global ones (presumed to be hashed).

```ts
styles = {
  container: 'container-hashed',
  'is-inline': 'is-inline-hashed',
  'is-wide': 'is-wide-hashed',
  'no-feedback': 'no-feedback-hashed',
};
```

### Arguments

The `{{local-class}}` helper uses positional arguments to accept the `styles` object (1st parameter) and local class names (rest parameters).

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

The `{{local-class}}` helper returns a string, which concatenates the corresponding global class names.

</details>


## Compatibility

* `ember-auto-import@v2`<sup>1</sup>
* Ember.js v4.4 or above<sup>2</sup>
* Node.js v16 or above

<sup>1. Until you can adopt `ember-auto-import@v2`, I recommend using [`ember-css-modules`](https://github.com/salsify/ember-css-modules) to do CSS modules.</sup>

<sup>2. Older versions may work but won't be supported.</sup>


## License

This project is licensed under the [MIT License](LICENSE.md).
