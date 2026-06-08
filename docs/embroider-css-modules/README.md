[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# docs-app-for-embroider-css-modules

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`docs-app-for-embroider-css-modules` provides the documentation site for `embroider-css-modules`. The app is deployed on https://embroider-css-modules.netlify.app/.


## Local development

> [!NOTE]
>
> To run the commands below, some packages in this monorepo must be built first.
>
> ```sh
> # From the workspace root
> pnpm prepare
> ```

```sh
# Run the app
pnpm start

# Lint files
pnpm lint
pnpm lint:fix

# Run tests
pnpm test
```
