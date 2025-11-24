import { assert, test } from '@codemod-utils/tests';

import { addLocalClasses } from '../../../src/utils/css/index.js';

test('utils | add-local-classes > simple case (4)', function () {
  const file = [
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
  ].join('\n');

  const classToStyles = new Map([
    [
      'checkbox',
      [
        {
          classes: ['checkbox'],
          location: {
            end: { column: 1, line: 11, offset: 213 },
            start: { column: 1, line: 1, offset: 0 },
          },
          raw:
            '.checkbox {\n' +
            '  align-items: center;\n' +
            '  background-color: white;\n' +
            '  border: 0.125rem solid #ffd54f;\n' +
            '  cursor: pointer;\n' +
            '  display: flex;\n' +
            '  height: 1rem;\n' +
            '  justify-content: center;\n' +
            '  position: relative;\n' +
            '  width: 1rem;\n' +
            '}',
          selector: '.checkbox',
        },
        {
          classes: ['checkbox'],
          location: {
            end: { column: 1, line: 16, offset: 277 },
            start: { column: 1, line: 13, offset: 215 },
          },
          raw: '.checkbox:focus {\n  background-color: #ffecb3;\n  outline: 0;\n}',
          selector: '.checkbox:focus',
        },
        {
          classes: ['checkbox'],
          location: {
            end: { column: 1, line: 20, offset: 333 },
            start: { column: 1, line: 18, offset: 279 },
          },
          raw: '.checkbox:not(:focus) {\n  border-color: transparent;\n}',
          selector: '.checkbox:not(:focus)',
        },
      ],
    ],
    [
      'checkmark-icon',
      [
        {
          classes: ['checkmark-icon'],
          location: {
            end: { column: 1, line: 24, offset: 370 },
            start: { column: 1, line: 22, offset: 335 },
          },
          raw: '.checkmark-icon {\n  color: white;\n}',
          selector: '.checkmark-icon',
        },
      ],
    ],
    [
      'is-checked',
      [
        {
          classes: ['is-checked'],
          location: {
            end: { column: 1, line: 28, offset: 416 },
            start: { column: 1, line: 26, offset: 372 },
          },
          raw: '.is-checked {\n  background-color: #1976d2;\n}',
          selector: '.is-checked',
        },
      ],
    ],
    [
      'is-disabled',
      [
        {
          classes: ['is-disabled'],
          location: {
            end: { column: 1, line: 32, offset: 474 },
            start: { column: 1, line: 30, offset: 418 },
          },
          raw: '.is-disabled {\n  composes: input-disabled from global;\n}',
          selector: '.is-disabled',
        },
        {
          classes: ['is-disabled', 'checkmark-icon'],
          location: {
            end: { column: 1, line: 36, offset: 526 },
            start: { column: 1, line: 34, offset: 476 },
          },
          raw: '.is-disabled .checkmark-icon {\n  color: #546e7a;\n}',
          selector: '.is-disabled .checkmark-icon',
        },
      ],
    ],
  ]);

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: false,
    }),
    [
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
      `      class="{{styles.checkbox}} {{if this.isChecked styles.is-checked}}  {{if (or @isDisabled @isReadOnly) styles.is-disabled}}  "`,
      `      data-test-field={{@label}}`,
      `      role="checkbox"`,
      `      tabindex={{unless @isDisabled "0"}}`,
      `      {{on "click" this.updateValue}}`,
      `      {{on "keypress" this.updateValueByPressingSpace}}`,
      `    >`,
      `      {{#if this.isChecked}}`,
      `        {{svgJar`,
      `          "check"`,
      `          class=styles.checkmark-icon`,
      `          desc="A checkmark to indicate that the input field is checked"`,
      `          role="img"`,
      `        }}`,
      `      {{/if}}`,
      `    </span>`,
      `  </:field>`,
      `</UiFormField>`,
    ].join('\n'),
  );

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: true,
    }),
    [
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
      `      class="{{this.styles.checkbox}} {{if this.isChecked this.styles.is-checked}}  {{if (or @isDisabled @isReadOnly) this.styles.is-disabled}}  "`,
      `      data-test-field={{@label}}`,
      `      role="checkbox"`,
      `      tabindex={{unless @isDisabled "0"}}`,
      `      {{on "click" this.updateValue}}`,
      `      {{on "keypress" this.updateValueByPressingSpace}}`,
      `    >`,
      `      {{#if this.isChecked}}`,
      `        {{svgJar`,
      `          "check"`,
      `          class=this.styles.checkmark-icon`,
      `          desc="A checkmark to indicate that the input field is checked"`,
      `          role="img"`,
      `        }}`,
      `      {{/if}}`,
      `    </span>`,
      `  </:field>`,
      `</UiFormField>`,
    ].join('\n'),
  );
});
