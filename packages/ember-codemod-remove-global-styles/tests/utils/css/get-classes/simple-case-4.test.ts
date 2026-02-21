import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClasses } from '../../../../src/utils/css/index.js';

test('utils | css | get-classes > simple case (4)', function () {
  const file = normalizeFile([
    `<UiFormField`,
    `  @errorMessage={{this.errorMessage}}`,
    `  @isInline={{@isInline}}`,
    `  @isWide={{@isWide}}`,
    `>`,
    `  <:label as |l|>`,
    `    <label data-test-label id={{concat l.inputId "-label"}}>`,
    `      {{@label}}`,
    ``,
    `      {{#if @isRequired}}`,
    `        <span aria-hidden="true">`,
    `          *`,
    `        </span>`,
    `      {{/if}}`,
    `    </label>`,
    `  </:label>`,
    ``,
    `  <:field as |f|>`,
    `    <span`,
    `      aria-checked={{if this.isChecked "true" "false"}}`,
    `      aria-disabled={{if @isDisabled "true" "false"}}`,
    `      aria-labelledby={{concat f.inputId "-label"}}`,
    `      aria-readonly={{if @isReadOnly "true" "false"}}`,
    `      aria-required={{if @isRequired "true" "false"}}`,
    `      class="checkbox`,
    `        {{if this.isChecked 'is-checked'}}`,
    `        {{if (or @isDisabled @isReadOnly) 'is-disabled'}}`,
    `        "`,
    `      data-test-field={{@label}}`,
    `      role="checkbox"`,
    `      tabindex={{unless @isDisabled "0"}}`,
    `      {{on "click" this.updateValue}}`,
    `      {{on "keypress" this.updateValueByPressingSpace}}`,
    `    >`,
    `      {{#if this.isChecked}}`,
    `        {{svgJar`,
    `          "check"`,
    `          class="checkmark-icon"`,
    `          desc="A checkmark to indicate that the input field is checked"`,
    `          role="img"`,
    `        }}`,
    `      {{/if}}`,
    `    </span>`,
    `  </:field>`,
    `</UiFormField>`,
  ]);

  assert.deepStrictEqual(getClasses(file), {
    classNames: ['checkbox', 'is-checked', 'is-disabled', 'checkmark-icon'],
    errors: [],
  });
});
