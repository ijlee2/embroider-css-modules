import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';

test('utils | css | get-class-names > simple case (1)', function () {
  const file = normalizeFile([
    `{{#if this.isTestEnvironment}}`,
    `  <div class="placeholder-image"></div>`,
    `{{else}}`,
    `  <img alt="" class="image" src={{@src}} />`,
    `{{/if}}`,
  ]);

  assert.deepStrictEqual(getClassNames(file), {
    classNames: ['placeholder-image', 'image'],
    errors: [],
  });
});
