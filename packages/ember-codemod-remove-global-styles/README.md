[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# ember-codemod-remove-global-styles

_Codemod to localize global styles_


## Usage

### Arguments

You must pass `--src` to indicate the location of your global stylesheet.

```sh
pnpx ember-codemod-remove-global-styles --src app/assets/app.css
```

<details>

<summary>Optional: Limit types of files to consider</summary>

By default, the codemod considers components and routes. Pass `--convert` to consider a subset of these.

```sh
# Components only
pnpx ember-codemod-remove-global-styles --convert components

# Routes only
pnpx ember-codemod-remove-global-styles --convert routes
```

</details>

<details>

<summary>Optional: Limit folders to consider</summary>

By default, the codemod considers all files and folders for components and routes. Pass `--folder` to limit the search to 1 folder. (You may use glob patterns to specify multiple folders.)

```sh
# `ui` folder only
pnpx ember-codemod-remove-global-styles --folder ui

# `ui/form` folder only
pnpx ember-codemod-remove-global-styles --folder ui/form

# `route1` and `route2` folders only
pnpx ember-codemod-remove-global-styles --convert routes --folder "{route1,route2}"
```

</details>

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod somewhere else (i.e. not in the current directory).

```sh
pnpx ember-codemod-remove-global-styles --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-remove-global-styles.js --root <path/to/your/project>
```


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
