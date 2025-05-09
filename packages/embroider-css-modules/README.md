[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules

_CSS modules for Embroider projects_

1. [What is it?](#what-is-it)
1. [Installation](#installation)
1. [API](#api)
    - [Helper: `{{local}}`](#helper-local)
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
    import '@glint/environment-ember-loose';

    import type EmbroiderCssModulesRegistry from 'embroider-css-modules/template-registry';

    declare module '@glint/environment-ember-loose/registry' {
      export default interface Registry extends EmbroiderCssModulesRegistry, /* other addon registries */ {
        // local entries
      }
    }
    ```

- In a `<template>` tag, use the named import to consume the `{{local}}` helper.

    ```css
    /* app/components/hello.css */
    .message {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
    }

    .emphasize {
      font-size: 64px;
      font-style: italic;
    }
    ```

    ```ts
    /* app/components/hello.gts */
    import { local } from 'embroider-css-modules';

    import styles from './hello.css';

    <template>
      <div class={{local styles "message" "emphasize"}}>
        Hello world!
      </div>
    </template>
    ```

</details>


## API

The addon provides 1 helper:

- `{{local}}`

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


### Helper: {{local}}

#### Why use it?

The `{{local}}` helper is useful when you want to apply multiple styles.

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

<summary>After: With the <code>{{local}}</code> helper</summary>

```hbs
{{! app/components/ui/form/field.hbs }}
<div
  class={{local
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

To conditionally apply multiple styles, use the `{{array}}` helper.

<details>

<summary>Example</summary>

```hbs
{{! app/components/hello.hbs }}
<div
  class={{local
    this.styles
    "message"
    (if this.someCondition (array "hide" "after-3-sec"))
  }}
>
  Hello world!
</div>
```

</details>


#### Arguments

The `{{local}}` helper uses positional arguments so that styles are applied in sequence. Pass the `styles` object first, then the local class name(s).


#### Outputs

The `{{local}}` helper returns a concatenated string. The string lists the global class names in the same order as the local ones.


## Compatibility

- Ember.js v4.12 or above
- Node.js v20 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
