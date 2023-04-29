[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# sample-v2-addon

`sample-v2-addon` is an Ember addon. We use it to check that `embroider-css-modules` is compatible with v2 addons.


## Local development

Before starting the application, build the `embroider-css-modules` package so that the addon can test the latest code.

```sh
# From the workspace root
cd packages/embroider-css-modules
pnpm build

# Change directory
cd ../../docs/sample-v2-addon
pnpm build
```


## Compatibility

* Node.js v16 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.
