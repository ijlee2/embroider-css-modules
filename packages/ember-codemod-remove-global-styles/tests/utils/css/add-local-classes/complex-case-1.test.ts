import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { addLocalClasses } from '../../../../src/utils/css/index.js';
import {
  classNameToStyles,
  templateFile,
} from '../../../helpers/utils/css/complex-case-1.js';

test('utils | css | add-local-classes > complex case (1)', function () {
  let output = addLocalClasses(templateFile, {
    classNameToStyles,
    isHbs: false,
  });

  assert.strictEqual(
    output,
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

  output = addLocalClasses(templateFile, {
    classNameToStyles,
    isHbs: true,
  });

  assert.strictEqual(
    output,
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
