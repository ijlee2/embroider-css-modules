[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# test-app-for-sample-v2-addon

`test-app-for-sample-v2-addon` is an Ember app. We use it to check that `sample-v2-addon` is compatible with various versions of these projects:

- [Ember](https://emberjs.com/releases/) (long-term support, release, beta, canary)
- [Embroider](https://github.com/embroider-build/embroider/) (safe, optimized)


## Local development

Before starting the application, build the `sample-v2-addon` package so that the app can test the latest code.

```sh
# From the workspace root
cd docs/sample-v2-addon
pnpm build

# Change directory
cd ../../tests/sample-v2-addon
pnpm start
pnpm test
```


## Compatibility

* Node.js v16 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.
