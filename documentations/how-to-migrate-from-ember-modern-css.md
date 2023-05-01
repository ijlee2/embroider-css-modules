# How to migrate from ember-modern-css

Already updated your project to try out [Ember + Modern CSS](https://github.com/evoactivity/ember-modern-css)? You can reach `embroider-css-modules` in a few steps.

1. [Install `embroider-css-modules`](#install-embroider-css-modules)
1. [Install `type-css-modules`](#install-type-css-modules)
1. [Give the local scope to the styles that you own](#give-the-local-scope-to-the-styles-that-you-own)
1. [Use the `{{local-class}}` helper](#use-the-local-class-helper)


## Install embroider-css-modules

The addon provides the `{{local-class}}` helper (a different one from `ember-css-modules`).

```sh
ember install embroider-css-modules
```


## Install type-css-modules

If you had installed [`@types/css-modules`](https://www.npmjs.com/package/@types/css-modules) or edited `types/global.d.ts` to type all CSS files as `Record<string, string>`, undo the change.

Instead, use `type-css-modules` to generate the declaration files.

<details>

<summary><code>package.json</code></summary>

```json
{
  "scripts": {
    "lint:types": "tsc --noEmit",
    "prelint:types": "type-css-modules --src app"
  },
  "devDependencies": {
    "type-css-modules": "...",
    "typescript": "..."
  }
}
```

</details>

[Learn more about the API](../packages/type-css-modules/README.md).


## Give the local scope to the styles that you own

With `webpack`, for example, you can configure [`mode`](https://webpack.js.org/loaders/css-loader/#mode) to be a function that returns `'local'` or `'global'`.

<details>

<summary><code>ember-cli-build.js</code></summary>

```js
module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // ...
  });

  const options = {
    packagerOptions: {
      cssLoaderOptions: {
        modules: {
          mode: (resourcePath) => {
            const hostAppWorkspaceDir = options.workspaceDir;
            const isHostAppPath = resourcePath.includes(hostAppWorkspaceDir);

            return isHostAppPath ? 'local' : 'global';
          },
        },
      },
    },
  };

  return require('@embroider/compat').compatBuild(app, Webpack, options);
};
```

</details>

In CSS module files, remove all `:local()` pseudo-class selectors. You can use the `:global()` pseudo-class selector to refer to "things from outside."

<details>

<summary>Example</summary>

```css
/* Before: app/components/navigation-menu.css */
:local(.list) {
  align-items: center;
  display: flex;
}

:local(.link) {
  display: inline-block;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  white-space: nowrap;
}

:local(.link).active {
  background-color: #15202d;
}

:local(.link):hover {
  background-color: #26313d;
  transition: background-color 0.17s;
}

```

```css
/* After: app/components/navigation-menu.css */
.list {
  align-items: center;
  display: flex;
}

.link {
  display: inline-block;
  font-size: 0.875rem;
  padding: 0.875rem 1rem;
  text-decoration: none;
  white-space: nowrap;
}

.link:global(.active) {
  background-color: #15202d;
}

.link:hover {
  background-color: #26313d;
  transition: background-color 0.17s;
}
```

</details>



## Use the {{local-class}} helper

Replace the `{{styles}}` helper with the `{{local-class}}` helper.

<details>

<summary>Example</summary>

```hbs
{{! Before: app/templates/products.hbs }}
<div
  class={{styles
    this
    (concat
      (if
        this.isInExperimentalGroup
        "shared-layout products-with-details "
        "shared-layout products "
      )
      "sticky-container "
    )
  }}
>
  ...
</div>
```

```hbs
{{! After: app/templates/products.hbs }}
<div
  class={{local-class
    this.styles
    (if
      this.isInExperimentalGroup
      (array "shared-layout" "products-with-details")
      (array "shared-layout" "products")
    )
    "sticky-container"
  }}
>
  ...
</div>
```

</details>

[Learn more about the API](../packages/embroider-css-modules/README.md).
