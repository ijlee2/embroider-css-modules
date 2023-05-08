[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# docs-app-for-embroider-css-modules-temporary

`docs-app-for-embroider-css-modules-temporary` is an Ember app. We use it to check that `ember-css-modules` and `embroider-css-modules-temporary` can coexist.


## Local development

Before starting the application, build the `embroider-css-modules-temporary` package so that the app can test the latest code.

```sh
# From the workspace root
cd packages/embroider-css-modules-temporary
pnpm build

# Change directory
cd ../../docs/embroider-css-modules-temporary
pnpm start
pnpm test
```


## Compatibility

* Node.js v16 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.
