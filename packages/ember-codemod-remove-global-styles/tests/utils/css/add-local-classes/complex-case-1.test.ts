import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { addLocalClasses } from '../../../../src/utils/css/index.js';

test('utils | css | add-local-classes > complex case (1)', function () {
  const file = normalizeFile([
    `{{#let (uniqueId) as |inputId|}}`,
    `  <div`,
    `    class="container`,
    `      {{if @isInline 'is-inline'}}`,
    `      {{if @isWide 'is-wide'}}`,
    `      {{unless @errorMessage 'no-feedback'}}`,
    `      "`,
    `    data-test-field-container`,
    `  >`,
    `    <div class="label">`,
    `      {{yield (hash inputId=inputId) to="label"}}`,
    `    </div>`,
    ``,
    `    <div class="field">`,
    `      {{yield (hash inputId=inputId) to="field"}}`,
    `    </div>`,
    ``,
    `    {{#if @errorMessage}}`,
    `      <div class="feedback is-error">`,
    `        {{svgJar`,
    `          "alert"`,
    `          desc="A warning to indicate that the input field has an error"`,
    `          role="img"`,
    `        }}`,
    ``,
    `        <span class="message" data-test-error-message role="alert">`,
    `          {{@errorMessage}}`,
    `        </span>`,
    `      </div>`,
    `    {{/if}}`,
    `  </div>`,
    `{{/let}}`,
  ]);

  const classToStyles = new Map([
    [
      'container',
      [
        {
          classes: ['container'],
          location: {
            end: { column: 1, line: 4, offset: 53 },
            start: { column: 1, line: 1, offset: 0 },
          },
          raw: normalizeFile([
            `.container {`,
            `  align-items: start;`,
            `  display: grid;`,
            `}`,
          ]),
          selector: '.container',
        },
        {
          classes: ['container', 'is-wide', 'no-feedback'],
          location: {
            end: { column: 1, line: 15, offset: 267 },
            start: { column: 1, line: 6, offset: 55 },
          },
          raw: normalizeFile([
            `.container:not(.is-wide):not(.no-feedback) {`,
            `  column-gap: 0;`,
            `  grid-template-areas:`,
            `    "label"`,
            `    "field"`,
            `    "feedback";`,
            `  grid-template-columns: 1fr;`,
            `  grid-template-rows: auto 1fr auto;`,
            `  row-gap: 0.5rem;`,
            `}`,
          ]),
          selector: '.container:not(.is-wide):not(.no-feedback)',
        },
        {
          classes: ['container', 'is-wide', 'no-feedback'],
          location: {
            end: { column: 1, line: 25, offset: 455 },
            start: { column: 1, line: 17, offset: 269 },
          },
          raw: normalizeFile([
            `.container:not(.is-wide).no-feedback {`,
            `  column-gap: 0;`,
            `  grid-template-areas:`,
            `    "label"`,
            `    "field";`,
            `  grid-template-columns: 1fr;`,
            `  grid-template-rows: auto 1fr;`,
            `  row-gap: 0.5rem;`,
            `}`,
          ]),
          selector: '.container:not(.is-wide).no-feedback',
        },
        {
          classes: ['container', 'is-wide', 'no-feedback'],
          location: {
            end: { column: 1, line: 35, offset: 667 },
            start: { column: 1, line: 27, offset: 457 },
          },
          raw: normalizeFile([
            `.container.is-wide:not(.no-feedback) {`,
            `  column-gap: 1rem;`,
            `  grid-template-areas:`,
            `    "label field"`,
            `    "label feedback";`,
            `  grid-template-columns: 10rem 1fr;`,
            `  grid-template-rows: 1fr auto;`,
            `  row-gap: 0.5rem;`,
            `}`,
          ]),
          selector: '.container.is-wide:not(.no-feedback)',
        },
        {
          classes: ['container', 'is-wide', 'no-feedback'],
          location: {
            end: { column: 1, line: 43, offset: 843 },
            start: { column: 1, line: 37, offset: 669 },
          },
          raw: normalizeFile([
            `.container.is-wide.no-feedback {`,
            `  column-gap: 1rem;`,
            `  grid-template-areas: "label field";`,
            `  grid-template-columns: 10rem 1fr;`,
            `  grid-template-rows: 1fr;`,
            `  row-gap: 0.5rem;`,
            `}`,
          ]),
          selector: '.container.is-wide.no-feedback',
        },
        {
          classes: ['container', 'is-inline', 'is-wide', 'no-feedback'],
          location: {
            end: { column: 1, line: 79, offset: 1390 },
            start: { column: 1, line: 71, offset: 1162 },
          },
          raw: normalizeFile([
            `.container.is-inline:not(.is-wide):not(.no-feedback) {`,
            `  column-gap: 1rem;`,
            `  grid-template-areas:`,
            `    "field label"`,
            `    "feedback feedback";`,
            `  grid-template-columns: auto 1fr;`,
            `  grid-template-rows: 1fr auto;`,
            `  row-gap: 0.5rem;`,
            `}`,
          ]),
          selector: '.container.is-inline:not(.is-wide):not(.no-feedback)',
        },
        {
          classes: ['container', 'is-inline', 'is-wide', 'no-feedback'],
          location: {
            end: { column: 1, line: 87, offset: 1576 },
            start: { column: 1, line: 81, offset: 1392 },
          },
          raw: normalizeFile([
            `.container.is-inline:not(.is-wide).no-feedback {`,
            `  column-gap: 1rem;`,
            `  grid-template-areas: "field label";`,
            `  grid-template-columns: auto 1fr;`,
            `  grid-template-rows: 1fr;`,
            `  row-gap: 0;`,
            `}`,
          ]),
          selector: '.container.is-inline:not(.is-wide).no-feedback',
        },
      ],
    ],
    [
      'label',
      [
        {
          classes: ['label'],
          location: {
            end: { column: 1, line: 49, offset: 920 },
            start: { column: 1, line: 45, offset: 845 },
          },
          raw: normalizeFile([
            `.label {`,
            `  grid-area: label;`,
            `  overflow: hidden;`,
            `  word-break: break-all;`,
            `}`,
          ]),
          selector: '.label',
        },
      ],
    ],
    [
      'field',
      [
        {
          classes: ['field'],
          location: {
            end: { column: 1, line: 53, offset: 952 },
            start: { column: 1, line: 51, offset: 922 },
          },
          raw: normalizeFile([`.field {`, `  grid-area: field;`, `}`]),
          selector: '.field',
        },
      ],
    ],
    [
      'feedback',
      [
        {
          classes: ['feedback'],
          location: {
            end: { column: 1, line: 60, offset: 1053 },
            start: { column: 1, line: 55, offset: 954 },
          },
          raw: normalizeFile([
            `.feedback {`,
            `  align-items: center;`,
            `  display: flex;`,
            `  font-size: 0.875rem;`,
            `  grid-area: feedback;`,
            `}`,
          ]),
          selector: '.feedback',
        },
        {
          classes: ['feedback', 'is-error'],
          location: {
            end: { column: 1, line: 64, offset: 1095 },
            start: { column: 1, line: 62, offset: 1055 },
          },
          raw: normalizeFile([
            `.feedback.is-error {`,
            `  color: #ff5252;`,
            `}`,
          ]),
          selector: '.feedback.is-error',
        },
      ],
    ],
    [
      'message',
      [
        {
          classes: ['message'],
          location: {
            end: { column: 1, line: 68, offset: 1132 },
            start: { column: 1, line: 66, offset: 1097 },
          },
          raw: normalizeFile([`.message {`, `  margin-left: 0.5rem;`, `}`]),
          selector: '.message',
        },
      ],
    ],
  ]);

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: false,
    }),
    normalizeFile([
      `{{#let (uniqueId) as |inputId|}}`,
      `  <div`,
      `    class="{{styles.container}} {{if @isInline 'is-inline'}}  {{if @isWide 'is-wide'}}  {{unless @errorMessage 'no-feedback'}}  "`,
      `    data-test-field-container`,
      `  >`,
      `    <div class={{styles.label}}>`,
      `      {{yield (hash inputId=inputId) to="label"}}`,
      `    </div>`,
      ``,
      `    <div class={{styles.field}}>`,
      `      {{yield (hash inputId=inputId) to="field"}}`,
      `    </div>`,
      ``,
      `    {{#if @errorMessage}}`,
      `      <div class={{concat styles.feedback " " "is-error"}}>`,
      `        {{svgJar`,
      `          "alert"`,
      `          desc="A warning to indicate that the input field has an error"`,
      `          role="img"`,
      `        }}`,
      ``,
      `        <span class={{styles.message}} data-test-error-message role="alert">`,
      `          {{@errorMessage}}`,
      `        </span>`,
      `      </div>`,
      `    {{/if}}`,
      `  </div>`,
      `{{/let}}`,
    ]),
  );

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: true,
    }),
    normalizeFile([
      `{{#let (uniqueId) as |inputId|}}`,
      `  <div`,
      `    class="{{this.styles.container}} {{if @isInline 'is-inline'}}  {{if @isWide 'is-wide'}}  {{unless @errorMessage 'no-feedback'}}  "`,
      `    data-test-field-container`,
      `  >`,
      `    <div class={{this.styles.label}}>`,
      `      {{yield (hash inputId=inputId) to="label"}}`,
      `    </div>`,
      ``,
      `    <div class={{this.styles.field}}>`,
      `      {{yield (hash inputId=inputId) to="field"}}`,
      `    </div>`,
      ``,
      `    {{#if @errorMessage}}`,
      `      <div class={{concat this.styles.feedback " " "is-error"}}>`,
      `        {{svgJar`,
      `          "alert"`,
      `          desc="A warning to indicate that the input field has an error"`,
      `          role="img"`,
      `        }}`,
      ``,
      `        <span class={{this.styles.message}} data-test-error-message role="alert">`,
      `          {{@errorMessage}}`,
      `        </span>`,
      `      </div>`,
      `    {{/if}}`,
      `  </div>`,
      `{{/let}}`,
    ]),
  );
});
