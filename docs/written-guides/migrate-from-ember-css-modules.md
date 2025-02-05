# Migrate from ember-css-modules

Have an Embroider app that depends on `ember-css-modules`? In a few steps, you can replace it with `embroider-css-modules` so that you can enable stricter Embroider settings.

1. [Remove ember-css-modules syntax](#remove-ember-css-modules-syntax)
1. [Update project configurations](#update-project-configurations)
1. [Enable stricter Embroider settings](#enable-stricter-embroider-settings)

> [!NOTE]
> If you get lost, you can check [`ember-container-query`](https://github.com/ijlee2/ember-container-query/pull/167) for reference.


## Remove ember-css-modules syntax

Run the provided [codemod](../../packages/ember-codemod-remove-ember-css-modules/README.md) to get started.

```sh
# From the project root
npx ember-codemod-remove-ember-css-modules --type app
```

You may also want to [refactor code](./refactor-code.md).


## Update project configurations

Please follow steps 1 and 2 for Embroider apps:

- [Install dependencies](./set-up-css-modules-apps-built-with-webpack.md#install-dependencies)
- [Configure Webpack](./set-up-css-modules-apps-built-with-webpack.md#configure-webpack)


## Enable stricter Embroider settings

In `ember-cli-build.js`, you may now be able to apply stricter settings for Embroider.

For simplicity, only the [options for `@embroider/compat`](https://github.com/embroider-build/embroider/#options) are shown. (The rest of the file remains the same.)

```js
const options = {
  packagerOptions: { /* ... */ },
  skipBabel: { /* ... */ },
  staticAddonTestSupportTrees: true,
  staticAddonTrees: true, // <-- new
  staticEmberSource: true,
  staticInvokables: true, // <-- new
};
```
