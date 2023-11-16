[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# my-v1-addon

1. [What is it?](#what-is-it)
1. [Local development](#local-development)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)


## What is it?

`my-v1-addon` is an Ember addon with `embroider-css-modules`. We use it to check that `embroider-css-modules` is compatible with v1 addons.


## Local development

After making a code change, build the addon so that consuming apps can test the latest code.

```sh
pnpm build
```

Some useful commands:

```sh
# Keep the addon running (live reload)
pnpm start

# Lint files
pnpm lint
pnpm lint:fix
```


## Compatibility

- Node.js v18 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](../../LICENSE.md).
