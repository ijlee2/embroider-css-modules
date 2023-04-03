[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# docs-app

`docs-app` is an Ember app. We use it to check that `embroider-css-modules` is compatible with "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)

In addition, the component and route templates, the application tests (visual regression tests), and the rendering tests serve as a living documentation for `embroider-css-modules`.

Lastly, end-developers can check the [deployed app](https://embroider-css-modules.netlify.app/) (do a "test drive") before they decide to introduce CSS modules to their projects.


## Local development

Before starting the application, build the `embroider-css-modules` package so that the app can test the latest code.

```sh
# From the workspace root
cd embroider-css-modules
pnpm build

# Change directory
cd ../docs-app
pnpm start
pnpm test
```

Alternatively, you can run the application with 1 command:

```sh
# From the workspace root
pnpm start
```


## Compatibility

* Node.js v16 or above
