import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClasses } from '../../../../src/utils/css/index.js';

test('utils | css | get-classes > error case (4)', function () {
  const file = normalizeFile([
    `{{#each @items as |item|}}`,
    `  <div class={{item.class}}>`,
    `    {{item.message}}`,
    `  </div>`,
    ``,
    `  <div class="{{item.class}}">`,
    `    {{item.message}}`,
    `  </div>`,
    `{{/each}}`,
  ]);

  assert.deepStrictEqual(getClasses(file), {
    classes: [],
    errors: [
      'Could not analyze {{item.class}} in template, line 2.',
      'Could not analyze {{item.class}} in template, line 6.',
    ],
  });
});
