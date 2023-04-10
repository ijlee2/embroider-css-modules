[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules

_CSS modules for Embroider + TypeScript projects_


## What is it?

`embroider-css-modules` provides a set of **tools and conventions** to help you implement CSS modules. It is compatible with "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)

A key idea behind `embroider-css-modules`: There is _some_ mechanism called CSS modules, which maps local class names to global ones. The _how_ is loosely tied to Ember and allowed to change in the future.

```ts
// We can somehow map local class names to global ones
const styles = {
  'container': 'container-hashed',
  'is-inline': 'is-inline-hashed',
  'is-wide': 'is-wide-hashed',
  'no-feedback': 'no-feedback-hashed',
};
```

In short, `embroider-css-modules` depends very little on how CSS modules is implemented. It focuses on providing tools and conventions that improve your developer experience (DX).


### Package overview

- [`ember-codemod-remove-ember-css-modules`](/ember-codemod-remove-ember-css-modules/README.md)
- [`embroider-css-modules`](/embroider-css-modules/README.md)
- [`type-css-modules`](/type-css-modules/README.md)


### Limitations

`embroider-css-modules` has been developed with Ember apps in mind. What `embroider-css-modules` looks like for addons and engines is currently unknown.


## Migration guides

- [How to migrate from `ember-css-modules`](./documentations/how-to-migrate-from-ember-css-modules.md)
- [How to migrate from `ember-modern-css`](./documentations/how-to-migrate-from-ember-modern-css.md)


## Contributing

TBA


## Credits

The `webpack` implementation is possible thanks to [Ember + Modern CSS](https://github.com/evoactivity/ember-modern-css) by [@evoactivity](https://github.com/evoactivity). Special thanks to the maintainers of [`ember-css-modules`](https://github.com/salsify/ember-css-modules), who paved the Ember way to CSS modules.


## License

This project is licensed under the [MIT License](LICENSE.md).
