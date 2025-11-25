[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# ember-codemod-remove-global-styles

_Codemod to localize global styles_


## Why use it?

Moving from global styles to CSS modules can be tedious and error-prone. Run this codemod to get started.

The codemod:

- Statically analyzes code (no need to build projects)
- Supports v1 apps (classic, Webpack), v2 apps (Vite)
- Light and fast


## Usage

Step 1. Quickly migrate.<sup>1,2</sup>

```sh
cd <path/to/your/project>
pnpx ember-codemod-remove-global-styles <arguments>
```

Step 2. Review the package.

- [x] Fix format and lint errors.<sup>3</sup>
- [x] Run tests.

<sup>1. The codemod assumes that your apps and addons follow the Octane layout (flat or nested). If not, you can run codemods to move away from [classic](https://github.com/ember-codemods/ember-component-template-colocation-migrator) and [pod](https://github.com/ijlee2/ember-codemod-pod-to-octane).</sup>

<sup>2. The codemod assumes a single CSS file, where you have defined all global styles that you own. You can obtain such a file by exploring the `dist/assets` folder.</sup>

<sup>3. If you need lint configs that support `*.module.css`, you can install packages from [`@ijlee2-frontend-configs`](https://github.com/ijlee2/frontend-configs).</sup>


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
