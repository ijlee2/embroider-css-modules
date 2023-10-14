[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# my-app

1. [What is it?](#what-is-it)
1. [Local development](#local-development)
    - [One-line `start` command](#one-line-start-command)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## What is it?

`my-app` is an Ember app with `embroider-css-modules`. We use it to check that `embroider-css-modules` is compatible with "bleeding-edge" Ember:

- [Embroider on the strictest settings](https://github.com/embroider-build/embroider/#options) (including route splitting)
- [TypeScript](https://www.typescriptlang.org/docs/) + [Glint](https://typed-ember.gitbook.io/glint/)
- [`<template>` tag](https://github.com/ember-template-imports/ember-template-imports)

In addition, the component and route templates, the application tests (visual regression tests), and the rendering tests serve as a living documentation.

Lastly, end-developers can check the [deployed app](https://embroider-css-modules.netlify.app/) (do a "test drive") before they decide to introduce CSS modules to their projects.


## Local development

Before starting the application, build its dependencies so that you can test the latest code.

```sh
# From the workspace root
pnpm build

# Change directory
cd docs/my-app
```

Some useful commands:

```sh
# Run the app
pnpm start

# Lint files
pnpm lint
pnpm lint:fix

# Run tests
pnpm test
```


### One-line start command

With 1 command, you can build the dependencies and start the app:

```sh
# From the workspace root
pnpm start
```


## Compatibility

- Node.js v18 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](../../LICENSE.md).
