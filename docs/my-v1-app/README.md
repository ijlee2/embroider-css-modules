[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# my-v1-app

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v1-app` is an Embroider app built with Webpack. We use it to test `embroider-css-modules`.

In addition, the component and route templates, the application tests (visual regression tests), and the rendering tests serve as a living documentation.

Lastly, end-developers can check the [deployed app](https://embroider-css-modules.netlify.app/) (do a "test drive") before they decide to introduce CSS modules to their projects.


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
