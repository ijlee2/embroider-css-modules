[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)
[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Isaac/embroider-css-modules)

# embroider-css-modules-temporary

`embroider-css-modules` with renamed `{{local-class}}` helper


## Why use this package?

Both [`ember-css-modules`](https://github.com/salsify/ember-css-modules) and [`embroider-css-modules`](../embroider-css-modules) provide a helper named `{{local-class}}` (with different signatures).

When you have a monorepo with many packages that depend on `ember-css-modules`, you will likely want to migrate code in increments. `embroider-css-modules-temporary` provides `{{local-class-new}}` so that you don't run into a name collision.

In short, when `ember-css-modules` is present,

- Write `{{local-class}}` to refer to the helper from `ember-css-modules`
- Write `{{local-class-new}}` to refer to the helper from `embroider-css-modules-temporary`

Once the migration is complete:

- Replace `embroider-css-modules-temporary` with `embroider-css-modules`
- Rename `{{local-class-new}}` to `{{local-class}}`


## Installation

```sh
ember install embroider-css-modules-temporary
```

Information about API and compatible versions can be found in [`embroider-css-modules`](../embroider-css-modules).


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
