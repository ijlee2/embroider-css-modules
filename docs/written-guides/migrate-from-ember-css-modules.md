# Migrate from ember-css-modules

You can reach `embroider-css-modules` in a few steps. (See [`ember-container-query`](https://github.com/ijlee2/ember-container-query/pull/167) for reference.)

1. [Remove ember-css-modules](#remove-ember-css-modules)
1. [Configure Webpack](#configure-webpack)
1. [Enable stricter Embroider settings](#enable-stricter-embroider-settings)


## Remove ember-css-modules

Run `ember-codemod-remove-ember-css-modules` to remove `ember-css-modules` syntax.

```sh
npx ember-codemod-remove-ember-css-modules <arguments>
```

For more information, please see [the codemod's `README`](../../packages/ember-codemod-remove-ember-css-modules/README.md).


## Update project configurations

Please follow steps 1-3 of [Set up CSS modules (apps)](./set-up-css-modules-apps.md).


## Enable stricter Embroider settings

With `ember-css-modules` gone, you may be able to apply stricter settings for Embroider.

<details>

<summary><code>ember-cli-build.js</code></summary>

For simplicity, only `options` is shown. (The rest of the code remains the same.)

```js
const options = {
  packagerOptions: { /* ... */ },
  skipBabel: { /* ... */ },
  staticAddonTestSupportTrees: true,
  staticAddonTrees: true, // <-- new
  staticComponents: true, // <-- new
  staticEmberSource: true,
  staticHelpers: true,
  staticModifiers: true,
};
```

</details>

Learn more about the [options for Embroider](https://github.com/embroider-build/embroider/#options).
