import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClasses } from '../../../../src/utils/css/index.js';

test('utils | css | get-classes > complex case (1)', function () {
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

  assert.deepStrictEqual(getClasses(file), {
    classes: [
      'container',
      'is-inline',
      'is-wide',
      'no-feedback',
      'label',
      'field',
      'feedback',
      'is-error',
      'message',
    ],
    errors: [],
  });
});
