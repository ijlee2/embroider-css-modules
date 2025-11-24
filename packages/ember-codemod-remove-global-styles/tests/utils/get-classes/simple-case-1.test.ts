import { assert, test } from '@codemod-utils/tests';

import { getClasses } from '../../../src/utils/css/index.js';

test('utils | get-classes > simple case (1)', function () {
  const file = [
    `{{#if this.isTestEnvironment}}`,
    `  <div class="placeholder-image"></div>`,
    `{{else}}`,
    `  <img alt="" class="image" src={{@src}} />`,
    `{{/if}}`,
  ].join('\n');

  assert.deepStrictEqual(getClasses(file), {
    classes: ['placeholder-image', 'image'],
    errors: [],
  });
});
