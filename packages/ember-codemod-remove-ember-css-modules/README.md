[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/embroider-css-modules/actions/workflows/ci.yml)

# ember-codemod-remove-ember-css-modules

_Codemod to replace `ember-css-modules` with `embroider-css-modules`_

1. [Features](#features)
1. [Usage](#usage)
    - [Arguments](#arguments)
    - [Limitations](#limitations)
1. [How to refactor code](#how-to-refactor-code)
    - [Remove code inheritance](#remove-code-inheritance)
    - [Remove complex string concatenations](#remove-complex-string-concatenations)
1. [Compatibility](#compatibility)
1. [Contributing](#contributing)
1. [License](#license)


## Features

- Preserves your code whenever possible
- Supports [`glint`](https://typed-ember.gitbook.io/glint/)
- Focuses on maintainability and extensibility


## Usage

You can check [`ember-container-query`](https://github.com/ijlee2/ember-container-query/pull/167) as a reference.

Step 1. Quickly migrate to [`embroider-css-modules`](https://github.com/ijlee2/embroider-css-modules).<sup>1</sup>

```sh
cd <path/to/your/project>
npx ember-codemod-remove-ember-css-modules <arguments>
```

Step 2. Review the project.

- [x] Update the configuration files.<sup>2</sup>
- [x] Remove the remaining instances of `local-class` attributes and `{{local-class}}` helpers from `ember-css-modules`.
- [x] Confirm that you can run all scripts in `package.json`.

<sup>1. Some prerequisites for running the codemod: First, migrate to the Octane layout (flat or nested). You can leverage codemods for [classic](https://github.com/ember-codemods/ember-component-template-colocation-migrator) and [pod](https://github.com/ijlee2/ember-codemod-pod-to-octane) layouts. Second, [refactor code](#how-to-refactor-code) to help the codemod update templates correctly.</sup>

<sup>2. Files such as `.eslintrc.js`, `.prettierrc.js`, `.stylelintrc.js`, `.template-lintrc.js`, `ember-cli-build.js`, `package.json`, `postcss.config.js`, `tsconfig.json`, etc.</sup>


### Arguments

<details>
<summary>Optional: Specify the component structure</summary>

By default, an Octane project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
npx ember-codemod-remove-ember-css-modules --component-structure="nested"
```

</details>

<details>
<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-remove-ember-css-modules --root=<path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical uses of `ember-css-modules`. It is not designed to cover one-off cases.

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-remove-ember-css-modules.js --root=<path/to/your/project>
```


## How to refactor code

### Remove code inheritance

`ember-css-modules` allows composing (really, inheriting) CSS code in two ways:

- `{{local-class ... from="..."}}` in `*.hbs`
- `composes: ... from '...';` in `*.css`

Code inheritance can be signs of premature abstraction and incorrect component design. Ideally, you might duplicate code, then refactor it.

If short on time, you can import the relevant `styles` object in the backing class.

<details>

<summary>Before, with <code>ember-css-modules</code></summary>

Case 1:

```hbs
{{! app/components/ui/form/textarea.hbs }}
<textarea
  class={{local-class "input" from="app/components/ui/form/input.css"}}
/>
```

Case 2:

```css
/* app/components/ui/form/textarea.css */
.textarea {
  composes: input from "app/components/ui/form/input.css";
}
```

```hbs
{{! app/components/ui/form/textarea.hbs }}
<textarea
  local-class="textarea"
/>
```

</details>

<details>

<summary>After, with <code>embroider-css-modules</code></summary>

```ts
/* app/components/ui/form/textarea.ts */
import Component from '@glimmer/component';

import inputStyles from './input.css';
import styles from './textarea.css';

export default class UiFormTextareaComponent extends Component {
  inputStyles = inputStyles;
  styles = styles;
}
```

```hbs
{{! app/components/ui/form/textarea.hbs }}
<textarea
  class={{this.inputStyles.input}}
/>
```

</details>


### Remove complex string concatenations

In `ember-css-modules`, a string can represent multiple local class names via concatenation. In `embroider-css-modules`, each string represents exactly one.

<details>

<summary>Before, with <code>ember-css-modules</code></summary>

```hbs
{{! app/components/ui/form/textarea.hbs }}
<textarea
  local-class="
    textarea
    {{if (or @isDisabled @isReadOnly) 'is-disabled'}}
  "
/>
```

</details>

<details>

<summary>After, with <code>embroider-css-modules</code></summary>

```hbs
{{! app/components/ui/form/textarea.hbs }}
<textarea
  class={{local-class
    this.styles
    "textarea"
    (if (or @isDisabled @isReadOnly) "is-disabled")
  }}
/>
```

</details>

The codemod may fail to update complex expressions. Refactor templates to provide hints. For example, remove nested conditionals (apply them outside the HTML element) and use the `{{concat}}` helper to group substrings.

<details>

<summary>Before refactor, with <code>ember-css-modules</code></summary>

```hbs
{{! app/components/ui/form/phone.hbs }}
<input
  local-class="input flag-{{@country}}"
  type="tel"
/>
```

</details>

<details>

<summary>After refactor, with <code>ember-css-modules</code></summary>

```hbs
{{! app/components/ui/form/phone.hbs }}
<input
  local-class="input {{concat 'flag-' @country}}"
  type="tel"
/>
```

</details>


## Compatibility

- Node.js v18 or above


## Contributing

See the [Contributing](../../CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
