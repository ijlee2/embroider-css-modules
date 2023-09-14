[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# docs-app-for-embroider-css-modules-temporary

1. [What is it?](#what-is-it)
1. [Local development](#local-development)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## What is it?

`docs-app-for-embroider-css-modules-temporary` is an Ember app. We use it to check that `ember-css-modules` and `embroider-css-modules-temporary` can coexist.


## Local development

Before starting the application, build its dependencies so that you can test the latest code.

```sh
# From the workspace root
pnpm build

# Change directory
cd docs/embroider-css-modules-temporary
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


## Compatibility

- Node.js v18 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](../../LICENSE.md).
