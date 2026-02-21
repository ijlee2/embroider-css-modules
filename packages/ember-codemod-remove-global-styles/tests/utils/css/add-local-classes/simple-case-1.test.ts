import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { addLocalClasses } from '../../../../src/utils/css/index.js';
import {
  classNameToStyles,
  templateFile,
} from '../../../helpers/utils/css/simple-case-1.js';

test('utils | css | add-local-classes > simple case (1)', function () {
  let output = addLocalClasses(templateFile, {
    classNameToStyles,
    isHbs: false,
  });

  assert.strictEqual(
    output,
    normalizeFile([
      `{{#if this.isTestEnvironment}}`,
      `  <div class={{styles.placeholder-image}}></div>`,
      `{{else}}`,
      `  <img alt="" class={{styles.image}} src={{@src}} />`,
      `{{/if}}`,
    ]),
  );

  output = addLocalClasses(templateFile, {
    classNameToStyles,
    isHbs: true,
  });

  assert.strictEqual(
    output,
    normalizeFile([
      `{{#if this.isTestEnvironment}}`,
      `  <div class={{this.styles.placeholder-image}}></div>`,
      `{{else}}`,
      `  <img alt="" class={{this.styles.image}} src={{@src}} />`,
      `{{/if}}`,
    ]),
  );
});
