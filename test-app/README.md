[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# test-app

`test-app` is an Ember app. We use it to check that `embroider-css-modules` is compatible with various versions of these projects:

- [Ember](https://emberjs.com/releases/) (long-term support, release, beta, canary)
- [Embroider](https://github.com/embroider-build/embroider/) (safe, optimized)


## Local development

Before starting the application, build the `embroider-css-modules` package so that the app can test the latest code.

```sh
# From the workspace root
cd packages/embroider-css-modules
pnpm build

# Change directory
cd ../../test-app
pnpm start
pnpm test
```


## Compatibility

* Node.js v16 or above


## Contributing

See the [Contributing](../CONTRIBUTING.md) guide for details.
