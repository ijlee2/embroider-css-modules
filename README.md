[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules

_CSS modules for Embroider + TypeScript projects_


## What is it?

`embroider-css-modules` provides a set of **tools and conventions** to help you implement [CSS modules](https://github.com/css-modules/css-modules). It is compatible with "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)

A key idea behind `embroider-css-modules`: There is _some way_ to map local class names to global ones. The _how_ is loosely tied to Ember and allowed to change in the future.

```ts
// We can somehow map local class names to global ones
const styles = {
  'container': 'lzeQ4',
  'is-inline': 'mJGCE',
  'is-wide': '_2lPSR',
  'no-feedback': 'YpQbt',
};
```

In short, `embroider-css-modules` depends little on how CSS modules is implemented. It focuses on providing tools and conventions that improve your developer experience (DX).


## Package overview

- [ember-codemod-remove-ember-css-modules](/packages/ember-codemod-remove-ember-css-modules/README.md)
- [embroider-css-modules](/packages/embroider-css-modules/README.md)
- [type-css-modules](/packages/type-css-modules/README.md)


## Guides

- [Migrate from ember-css-modules](./docs/written-guides/migrate-from-ember-css-modules.md)
- [Migrate from ember-modern-css](./docs/written-guides/migrate-from-ember-modern-css.md)
- [Set up CSS modules (apps)](./docs/written-guides/set-up-css-modules-apps.md)
- [Set up CSS modules (v2 addons)](./docs/written-guides/set-up-css-modules-v2-addons.md)


## Limitations

What `embroider-css-modules` looks like is:

- Quite stable for apps
- In development for v2 addons
- Unknown for v1 addons
- Unknown for engines


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## Credits

The `webpack` implementation is possible thanks to [Ember + Modern CSS](https://github.com/evoactivity/ember-modern-css) by [@evoactivity](https://github.com/evoactivity). Special thanks to the maintainers of [`ember-css-modules`](https://github.com/salsify/ember-css-modules), who paved the Ember way to CSS modules.


## License

This project is licensed under the [MIT License](LICENSE.md).
