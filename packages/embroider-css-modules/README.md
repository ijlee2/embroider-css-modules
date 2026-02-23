[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules

_CSS modules for Embroider projects_


## What is it?

The addon provides tools to help you use [CSS modules](https://github.com/css-modules/css-modules) in Embroider projects. It works on "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [TypeScript](https://www.typescriptlang.org/docs/) + [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)


## Installation

```sh
# For apps
pnpm add -D embroider-css-modules

# For addons (install as a dependency)
pnpm add embroider-css-modules
```

<details>

<summary>Use Glint and <code>*.hbs</code> files?</summary>

Extend this addon's template registry to get native types.

```ts
/* types/index.d.ts */
import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

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

- `{{local}}`


### Helper: {{local}}

#### Why use it?

The `{{local}}` helper is useful when you want to apply multiple styles.

```glimmer-js
/* app/components/hello.gjs */
import { local } from 'embroider-css-modules';

import styles from './hello.module.css';

<template>
  <div class={{local styles "message" "hide"}}>
    Hello world!
  </div>
</template>
```

To conditionally apply multiple styles, use the `{{array}}` helper.

```glimmer-js
/* app/components/hello.gjs */
import { array } from '@ember/helper';
import { local } from 'embroider-css-modules';

import styles from './hello.module.css';

<template>
  <div
    class={{local
      styles
      "message"
      (if @hide (array "hide" "after-3-sec"))
    }}
  >
    Hello world!
  </div>
</template>
```


#### Arguments

The `{{local}}` helper uses positional arguments so that styles are applied in sequence. Pass the `styles` object first, then the local class name(s).


#### Output

The `{{local}}` helper returns a concatenated string. The string lists the global class names in the same order as the local ones.


## Compatibility

- Ember.js v4.12 or above
- Node.js v22 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](./LICENSE.md).
