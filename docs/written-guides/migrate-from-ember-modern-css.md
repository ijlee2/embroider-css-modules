# Migrate from ember-modern-css

Already implemented [Ember + Modern CSS](https://github.com/evoactivity/ember-modern-css) in your project? You can reach `embroider-css-modules` in a few steps.

1. [Install dependencies](#install-dependencies)
1. [Configure type-css-modules](#configure-type-css-modules)
1. [Own your styles](#own-your-styles)
1. [Use the {{local}} helper](#use-the-local-helper)


## Install dependencies

For PostCSS, here is what you likely need at minimum. (`cssnano` is not needed.)

- `autoprefixer`
- `postcss`
- `postcss-loader`

Finally, some packages to improve your developer experience (DX).

- [`embroider-css-modules`](../../packages/embroider-css-modules/README.md)
- [`type-css-modules`](../../packages/type-css-modules/README.md)<sup>1</sup>

All in all, here's a one-line command for installation:

```sh
pnpm install --dev \
  autoprefixer postcss postcss-loader \
  embroider-css-modules type-css-modules
```

<sup>1. Needed only if you have a TypeScript project.</sup>


## Configure type-css-modules

> [!NOTE]
> You can skip this step if you don't have a TypeScript project.

If you have typed `*.css` files, either by installing [`@types/css-modules`](https://www.npmjs.com/package/@types/css-modules) or defining the type to be `Record<string, string>` in `types/global.d.ts`, please undo the change.

Instead, write a pre-script as shown in [Set up CSS modules (apps built with Webpack) - CSS declaration files](./set-up-css-modules-apps-built-with-webpack.md#css-declaration-files).


## Own your styles

First, reconfigure [`cssLoaderOptions.modules.mode`](https://webpack.js.org/loaders/css-loader/#mode) as shown in [Set up CSS modules (apps) - Configure Webpack](./set-up-css-modules-apps-built-with-webpack.md#configure-webpack).

Next, remove all `:local()` pseudo-class selectors. Instead, use the `:global()` pseudo-class selector to refer to "things from outside."

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


## Use the {{local}} helper

> [!NOTE]
> You can skip this step if you didn't create the `{{styles}}` helper.

Remove the `{{styles}}` helper. To apply multiple styles, use the [`{{local}}` helper](../../packages/embroider-css-modules/README.md#helper-local) instead.

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
  class={{local
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
