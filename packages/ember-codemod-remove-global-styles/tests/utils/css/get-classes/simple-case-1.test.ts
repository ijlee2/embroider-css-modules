import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClasses } from '../../../../src/utils/css/index.js';

test('utils | css | get-classes > simple case (1)', function () {
  const file = normalizeFile([
    `{{#if this.isTestEnvironment}}`,
    `  <div class="placeholder-image"></div>`,
    `{{else}}`,
    `  <img alt="" class="image" src={{@src}} />`,
    `{{/if}}`,
  ]);

  assert.deepStrictEqual(getClasses(file), {
    classes: ['placeholder-image', 'image'],
    errors: [],
  });
});
