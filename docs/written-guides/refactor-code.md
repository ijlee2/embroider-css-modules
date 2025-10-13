# Refactor code

1. [Apply multiple styles](#apply-multiple-styles)
1. [Apply string concatenations](#apply-string-concatenations)
    - [Use `{{concat}}` helper to group substrings](#use-concat-helper-to-group-substrings)
    - [Do concatenations in the backing class](#do-concatenations-in-the-backing-class)
1. [Remove code inheritance](#remove-code-inheritance)
1. [Set spacing on the consumer's side](#set-spacing-on-the-consumers-side)
1. [Use var() for variables](#use-var-for-variables)


## Apply multiple styles

In `ember-css-modules`, a string (a single key) can represent multiple local class names. In `embroider-css-modules`, each string represents exactly one. This way, Glint can find typos and type issues.

Suppose we want to migrate the following code with `ember-css-modules`:

```hbs
<div
  local-class="
    container
    hide
  "
>
  Hello!
</div>
```

One option is to use the `{{concat}}` helper (i.e. pure Ember). Glint will alert typos in the words `this.styles`, `container`, or `hide`, but we have to ensure that a space exists between two styles.

```hbs
<div
  class={{concat
    this.styles.container
    " "
    this.styles.hide
  }}
>
  Hello!
</div>
```

To improve DX, we use the `{{local}}` helper from `embroider-css-modules`.

```hbs
<div
  class={{local
    this.styles
    "container"
    "hide"
  }}
>
  Hello!
</div>
```

Thanks to the helper, it's easy to understand how we can apply a style conditionally.

```hbs
<div
  class={{local
    this.styles
    "container"
    (if this.someCondition "hide")
  }}
>
  Hello!
</div>
```

To apply multiple styles conditionally, use the `{{array}}` helper. Again, Glint will find typos in the words `this.styles`, `container`, `hide`, and `after-3-sec`.

```hbs
<div
  class={{local
    this.styles
    "container"
    (if this.someCondition (array "hide" "after-3-sec"))
  }}
>
  Hello!
</div>
```


## Apply string concatenations

### Use {{concat}} helper to group substrings

Consider the following code with `ember-css-modules`. We (humans) can easily see that `flag-` and the value of `@country` go together, but not programs.

```hbs
<input
  local-class="input flag-{{@country}}"
  type="tel"
/>
```

Before running `ember-codemod-remove-ember-css-modules`, use the `{{concat}}` helper to group substrings.

```hbs
<input
  local-class="input {{concat 'flag-' @country}}"
  type="tel"
/>
```

### Do concatenations in the backing class

Often, the `{{concat}}` helper is used to change an argument to a class name. The `{{concat}}` helper's return type is `string`, so Glint can fail to find typos and type issues.

Consider the following component, which allows end-developers to pass an argument to style the list items.

```hbs
<ul
  class={{local
    this.styles
    "list"
    (concat 'item-space-' this.itemSpace)
  }}
>
  {{yield}}
</ul>
```

```ts
import Component from '@glimmer/component';

import styles from './list.css';

type ItemSpace = 'loose' | 'normal' | 'tight';

interface UiListSignature {
  Args: {
    itemSpace?: ItemSpace;
  };
  Blocks: {
    default: [];
  };
}

export default class UiListComponent extends Component<UiListSignature> {
  styles = styles;

  get itemSpace() {
    return this.args.itemSpace ?? 'normal';
  }
}
```

The goal is to create the local class name in the backing class, where we have more control over types. The template would end up looking like,

```hbs
<ul
  class={{local
    this.styles
    "list"
    this.itemSpaceClass
  }}
>
  {{yield}}
</ul>
```

One solution is to use a `switch` statement, a universal concept in programming. The code is accessible to many developers, but the rate at which LOC (lines of code) increase makes the code difficult to maintain and extend.

<details>

<summary>Solution</summary>

```ts
import Component from '@glimmer/component';

import styles from './list.css';

type ItemSpace = 'loose' | 'normal' | 'tight';

interface UiListSignature {
  Args: {
    itemSpace?: ItemSpace;
  };
  Blocks: {
    default: [];
  };
}

export default class UiListComponent extends Component<UiListSignature> {
  styles = styles;

  get itemSpaceClass() {
    switch (this.args.itemSpace) {
      case 'loose': {
        return 'item-space-loose';
      }

      case 'tight': {
        return 'item-space-tight';
      }

      default: {
        return 'item-space-normal';
      }
    }
  }
}
```

</details>

So let's use instead an object to create the mapping. The code is more concise, but it takes a while to get used to type derivation.

<details>

<summary>Solution</summary>

```ts
import Component from '@glimmer/component';

import styles from './list.css';

const itemSpaceClasses = {
  loose: 'item-space-loose',
  normal: 'item-space-normal',
  tight: 'item-space-tight',
} as const;

type ItemSpace = keyof typeof itemSpaceClasses;

interface UiListSignature {
  Args: {
    itemSpace?: ItemSpace;
  };
  Blocks: {
    default: [];
  };
}

export default class UiListComponent extends Component<UiListSignature> {
  styles = styles;

  get itemSpaceClass() {
    const itemSpace = this.args.itemSpace ?? 'normal';

    return itemSpaceClasses[itemSpace];
  }
}
```

</details>

The simplest solution is a string concatenation with `as const` ("const assertion"). We already saw `as const` in the object solution above; the syntax tells TypeScript to apply the strictest type possible for an expression.

<details>

<summary>Solution</summary>

```ts
import Component from '@glimmer/component';

import styles from './list.css';

type ItemSpace = 'loose' | 'normal' | 'tight';

interface UiListSignature {
  Args: {
    itemSpace?: ItemSpace;
  };
  Blocks: {
    default: [];
  };
}

export default class UiListComponent extends Component<UiListSignature> {
  styles = styles;

  get itemSpaceClass() {
    const itemSpace = this.args.itemSpace ?? 'normal';

    return `item-space-${itemSpace}` as const;
  }
}
```

</details>

The code is extremely concise, but argument values now dictate the class names (you can avoid this issue using `switch` or an object). You may introduce inconsistencies in casing and make it hard to refactor code in the future.


## Remove code inheritance

`ember-css-modules` allows composing (really, inheriting) CSS code in two ways:

- `composes: ... from '...';` in `*.css`
- `{{local-class ... from="..."}}` in `*.hbs`

The `composes` property, defined by [CSS modules](https://github.com/css-modules/css-modules/blob/master/docs/composition.md), will continue to work in an Embroider app. However, the import path must be either `global` or a relative path.

```css
/* app/components/ui/form/textarea.css */
.textarea {
  composes: input from "./input.css";
}

.is-disabled {
  composes: input-disabled from global;
}
```

<details>

<summary>Syntaxes that don't work</summary>

An absolute path:

```css
/* app/components/ui/form/textarea.css */
.textarea {
  composes: input from "my-app/components/ui/form/input.css";
}
```

A path to a v2 addon:

```css
/* app/components/ui/form/textarea.css */`
.textarea {
  composes: input from "my-v2-addon/components/ui/form/input.css";
}
```

</details>

The `{{local}}` helper from `embroider-css-modules` doesn't allow the `from="..."` syntax. `ember-codemod-remove-ember-css-modules` will find the affected components, but you will need to manually update their templates and stylesheets.

Please note, the presence of `composes` (in a set of related components) likely means, you need a component that focuses on layout and allows customization via [Ember's named blocks](https://guides.emberjs.com/release/components/block-content/). Ideally, you would create and consume this component to move away from `composes`. If short on time, you can import the relevant `styles` object in the backing class.

<details>

<summary>Before, with <code>ember-css-modules</code></summary>

Example 1:

```hbs
{{! app/components/ui/form/textarea.hbs }}
<textarea
  class={{local-class "input" from="my-app/components/ui/form/input.css"}}
/>
```

Example 2:

```css
/* app/components/ui/form/textarea.css */
.textarea {
  composes: input from "my-app/components/ui/form/input.css";
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

Give a unique name (i.e. something besides `styles`) to distinguish the inherited styles.

```hbs
{{! app/components/ui/form/textarea.hbs }}
<textarea
  class={{this.inputStyles.input}}
/>
```

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

</details>


## Set spacing on the consumer's side

A component becomes less reusable, when its container sets `margin`, `padding`, `height`, or `width` in an attempt to distance itself from other components. A value that worked in one situation can fail to work in another.

```css
/* Addon: src/components/ui/form/input.css */
.container {
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
}
```

```hbs
{{! Addon: src/components/ui/form/input.hbs }}
<div class={{this.styles.container}}>
  <label for={{this.inputId}}>
    {{@label}}
  </label>

  <input
    id={{this.inputId}}
    value={{this.value}}
    {{on "input" this.updateValue}}
  />
</div>
```

```hbs
{{! App: app/components/send-order.hbs }}
<Ui::Form
  @data={{this.initialData}}
  @onSubmit={{this.submitForm}}
  as |F|
>
  <F.Input @key="address" @label="Address" />

  <F.Input @key="city" @label="City" />

  <F.Input @key="state" @label="State" />

  {{! ... }}
</Ui::Form>
```

Instead, let the consumer set spacings. The rationale is, reusable components shouldn't care about what happens "outside." We encounter this idea also in [container queries](https://github.com/ijlee2/ember-container-query).

```diff
/* Addon: src/components/ui/form/input.css */
.container {
  align-items: center;
  display: flex;
  flex-direction: row;
-   margin-bottom: 16px;
}
```

```diff
/* App: app/components/send-order.css */
+ .input-container {
+   margin-bottom: 16px;
+ }
```

```diff
{{! App: app/components/send-order.hbs }}
<Ui::Form
  @data={{this.initialData}}
  @onSubmit={{this.submitForm}}
  as |F|
>
+   <div class={{this.styles.input-container}}>
    <F.Input @key="address" @label="Address" />
+   </div>

+   <div class={{this.styles.input-container}}>
    <F.Input @key="city" @label="City" />
+   </div>

+   <div class={{this.styles.input-container}}>
    <F.Input @key="state" @label="State" />
+   </div>

  {{! ... }}
</Ui::Form>
```


## Use var() for variables

CSS modules allows the [`@value`](https://github.com/css-modules/css-modules/blob/master/docs/values-variables.md) syntax for exporting and importing variables.

```css
/* app/assets/app.css */
/* stylelint-disable-next-line at-rule-no-unknown */
@value color-error: #ff5252;
```

```css
/* app/components/ui/form/field.css */
/* stylelint-disable-next-line at-rule-no-unknown */
@value color-error from "../../../assets/app.css";

.feedback.is-error {
  color: color-error;
}
```

By using [`var()`](https://developer.mozilla.org/docs/Web/CSS/var) (i.e. native CSS), we can avoid a dependency (`postcss-modules-values`) and leverage `stylelint` better. For example, we can enable [`declaration-property-value-no-unknown`](https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown/) to find incorrect key-value pairs. (Before, we couldn't enable it because lines like `color: color-error;` would be flagged.)

```css
/* app/assets/app.css */
:root {
  --color-error: #ff5252;
}
```

```css
/* app/components/ui/form/field.css */
.feedback.is-error {
  color: var(--color-error);
}
```

> [!NOTE]
> `var()` can't be used in media and container queries.

If you have many files with `@value`, consider [running a codemod](https://github.com/ijlee2/codemod-utils). The following code covers the usual cases.

<details>

<summary>PostCSS plugin</code></summary>

```ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
export const PostcssRemoveAtValue = () => {
  return {
    postcssPlugin: 'postcss-remove-at-value',

    prepare() {
      const errorMessages = [];
      const tokenValues = new Map<string, string>();

      return {
        AtRule(node) {
          switch (node.name) {
            case 'value': {
              const matches = node.params.match(/(.+) from/);

              if (!matches) {
                return;
              }

              matches[1].split(',').forEach((str) => {
                const key = str.trim();

                if (key === '') {
                  return;
                }

                if (key.includes(' as ')) {
                  const [oldName, newName] = key.split(' as ');

                  tokenValues.set(newName.trim(), `var(--${oldName.trim()})`);

                  return;
                }

                tokenValues.set(key, `var(--${key})`);
              });

              node.remove();

              break;
            }
          }
        },

        Declaration(node) {
          const matches = node.value.match(/calc\(([^)]+)\)/);

          // End-developers must update calc() manually
          if (matches) {
            const warn = Array.from(tokenValues.keys()).some((key) => {
              return matches[1].includes(key);
            });

            if (warn) {
              errorMessages.push(
                `Couldn't update \`${node.prop}\` on line ${node.source.start.line}`,
              );
            }

            return;
          }

          const values = node.value.split(' ');

          const newValues = values.map((value) => {
            if (!tokenValues.has(value)) {
              return value;
            }

            return tokenValues.get(value);
          });

          node.value = newValues.join(' ');
        },

        OnceExit() {
          console.log(errorMessages);
        },
      };
    },
  };
};
```

</details>

<details>

<summary>Codemod step</code></summary>

```ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { findFiles } from '@codemod-utils/files';
import postcss from 'postcss';

import type { Options } from '../types/index.js';
import { PostcssRemoveAtValue } from '../utils/css/postcss-remove-at-rule.js';

const postcssPlugins = [PostcssRemoveAtValue()];

function updateFile(file: string): string {
  const result = postcss(postcssPlugins).process(file);

  return result.css;
}

export function removeAtValue(options: Options): void {
  const { projectRoot } = options;

  // Assumed to be an Ember app (not a v1 or v2 addon)
  const filePaths = findFiles('app/**/*.css', {
    projectRoot,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    console.log(`-- Logs for ${filePath} --`);
    const newFile = updateFile(oldFile);

    writeFileSync(oldPath, newFile, 'utf8');
  });
}
```

</details>
