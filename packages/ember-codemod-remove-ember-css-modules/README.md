[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# ember-codemod-remove-ember-css-modules

_Codemod to replace `ember-css-modules` with `embroider-css-modules`_

1. [Features](#features)
1. [Usage](#usage)
    - [Arguments](#arguments)
    - [Limitations](#limitations)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## Features

The codemod helps you:

- Remove `ember-css-modules` syntax from an Embroider app
- Remove `ember-css-modules` syntax from a v2 addon

It preserves your code whenever possible.


## Usage

You can find a migration example in [`ember-container-query`](https://github.com/ijlee2/ember-container-query/pull/167).

Step 1. Quickly remove `ember-css-modules` syntax.<sup>1</sup>

```sh
cd <path/to/your/project>
npx ember-codemod-remove-ember-css-modules <arguments>
```

Manually remove the remaining instances of `local-class` attributes and `{{local-class}}` helpers.

Step 2. Update project configurations.<sup>2</sup>

- [x] Set up CSS modules (see the guides for [apps](../../docs/written-guides/set-up-css-modules-apps-built-with-webpack.md) and [v2 addons](../../docs/written-guides/set-up-css-modules-v2-addons.md)).
- [x] Confirm that you can run all scripts in `package.json`.

<sup>1. Some prerequisites for running the codemod: First, migrate to the Octane layout (flat or nested). You can leverage codemods for [classic](https://github.com/ember-codemods/ember-component-template-colocation-migrator) and [pod](https://github.com/ijlee2/ember-codemod-pod-to-octane) layouts. Second, [refactor code](../../docs/refactor-code.md) to help the codemod update templates correctly.</sup>

<sup>2. Files such as `.eslintrc.js`, `.prettierrc.js`, `.stylelintrc.js`, `.template-lintrc.js`, `ember-cli-build.js`, `package.json`, `postcss.config.js`, `tsconfig.json`, etc.</sup>


### Arguments

You must pass `--type` to indicate what type of project you have.

```sh
npx ember-codemod-remove-ember-css-modules --type app
npx ember-codemod-remove-ember-css-modules --type v2-addon
```


<details>

<summary>Optional: Specify the component structure</summary>

By default, an Embroider project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
npx ember-codemod-remove-ember-css-modules --component-structure nested
```

</details>

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-remove-ember-css-modules --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical uses of `ember-css-modules`. It is not designed to cover one-off cases.

<details>

<summary>V2 Addons</summary>

The codemod updates components only.

</details>

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-remove-ember-css-modules.js --root=<path/to/your/project>
```


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
