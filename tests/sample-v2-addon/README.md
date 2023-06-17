[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# test-app-for-sample-v2-addon

1. [What is it?](#what-is-it)
1. [Local development](#local-development)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## What is it?

`test-app-for-sample-v2-addon` is an Ember app. We use it to check that `sample-v2-addon` is compatible with various versions of these projects:

- [Ember](https://emberjs.com/releases/) (long-term support, release, beta, canary)
- [Embroider](https://github.com/embroider-build/embroider/) (safe, optimized)


## Local development

Before starting the application, build its dependencies so that you can test the latest code.

```sh
# From the workspace root
pnpm build

# Change directory
cd tests/sample-v2-addon
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

- Node.js v16 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](../../LICENSE.md).
