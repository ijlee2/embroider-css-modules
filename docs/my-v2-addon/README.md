[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# my-v2-addon

1. [What is it?](#what-is-it)
1. [Local development](#local-development)


## What is it?

`my-v2-addon` is an Ember addon with `embroider-css-modules`. We use it to check that `embroider-css-modules` is compatible with v2 addons.


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
# Keep the addon running (live reload)
pnpm start

# Lint files
pnpm lint
pnpm lint:fix
```
