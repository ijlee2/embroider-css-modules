[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# test-app-for-embroider-css-modules

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`test-app-for-embroider-css-modules` is an Ember app. We use it to check that `embroider-css-modules` is compatible with various versions of these projects:

- [Ember](https://emberjs.com/releases/) (long-term support, release, beta, canary)
- [Embroider](https://github.com/embroider-build/embroider/) (safe, optimized)


## Local development

> [!NOTE]
>
> To run the commands below, some packages in this monorepo must be built first.
>
> ```sh
> # From the workspace root
> pnpm prepare
> ```

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
