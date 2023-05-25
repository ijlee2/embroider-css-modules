[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules-temporary

`embroider-css-modules` with renamed `{{local-class}}` helper


## Why use this package?

Both [`ember-css-modules`](https://github.com/salsify/ember-css-modules) and [`embroider-css-modules`](../embroider-css-modules) provide a helper named `{{local-class}}` (with different signatures).

When you have a monorepo with many packages that depend on `ember-css-modules`, you will want to migrate code in increments. This addon provides `{{local-class-new}}` so that you don't run into a name collision.

In any template, you can mix code from `ember-css-modules` and `embroider-css-modules-temporary`.


```hbs
{{! app/templates/application.hbs }}
<div local-class="container">
  Hello world!
</div>

<div class={{local-class "container"}}>
  Hello world!
</div>

<div class={{local-class-new this.styles "container-new"}}>
  Hello world!
</div>
```

Once the migration is complete:

- Replace `embroider-css-modules-temporary` with `embroider-css-modules`
- Rename `{{local-class-new}}` to `{{local-class}}`

More information about API and compatible versions can be found in [`embroider-css-modules`](../embroider-css-modules).


## Installation

```sh
ember install embroider-css-modules-temporary
```


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
