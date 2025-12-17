[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules

_CSS modules for Embroider projects_


## What is it?

`embroider-css-modules` provides **tools and conventions** to help you use [CSS modules](https://github.com/css-modules/css-modules) in Embroider projects. It works on "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [TypeScript](https://www.typescriptlang.org/docs/) + [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)

A key idea behind `embroider-css-modules`: _How_ we map local class names to global ones has little to do with Ember. It's also allowed to change in the future.

```ts
// We can somehow map local class names to global ones
const styles = {
  'container': 'lzeQ4',
  'is-inline': 'mJGCE',
  'is-wide': '_2lPSR',
  'no-feedback': 'YpQbt',
};
```

As you will see in the [Guides](#guides) below, we delegate the how to Rollup, Webpack, and Vite—build tools from the wider JavaScript. With fewer responsibilities, `embroider-css-modules` can focus on improving developer experience (DX).


## Package overview

- [ember-codemod-remove-ember-css-modules](./packages/ember-codemod-remove-ember-css-modules/README.md)
- [ember-codemod-remove-global-styles](./packages/ember-codemod-remove-global-styles/README.md)
- [embroider-css-modules](./packages/embroider-css-modules/README.md)
- [type-css-modules](./packages/type-css-modules/README.md)


## Guides

- [Migrate from ember-css-modules](./docs/written-guides/migrate-from-ember-css-modules.md)
- [Migrate from ember-modern-css](./docs/written-guides/migrate-from-ember-modern-css.md)
- [Refactor code](./docs/written-guides/refactor-code.md)
- [Set up CSS modules (apps built with Vite)](./docs/written-guides/set-up-css-modules-apps-built-with-vite.md)
- [Set up CSS modules (apps built with Webpack)](./docs/written-guides/set-up-css-modules-apps-built-with-webpack.md)
- [Set up CSS modules (v2 addons)](./docs/written-guides/set-up-css-modules-v2-addons.md)


## Limitations

For classic v1 apps (i.e. without Webpack) and v1 addons, you will want to use [`ember-css-modules`](https://github.com/salsify/ember-css-modules).


## Contributing

See the [Contributing](./CONTRIBUTING.md) guide for details.


## Credits

The `webpack` implementation is possible, thanks to ideas from [Ember + Modern CSS](https://github.com/evoactivity/ember-modern-css) by [@evoactivity](https://github.com/evoactivity). Special thanks to the maintainers of `ember-css-modules`, who paved the Ember way to CSS modules.


## License

This project is licensed under the [MIT License](./LICENSE.md).
