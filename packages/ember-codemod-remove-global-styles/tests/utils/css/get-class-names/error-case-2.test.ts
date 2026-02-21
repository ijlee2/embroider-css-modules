import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';

test('utils | css | get-class-names > error case (2)', function () {
  const file = normalizeFile([
    `<div class="message-1 {{if @type @type "default-1"}}"></div>`,
    `<div class="message-2 {{or @type "default-2"}}"></div>`,
  ]);

  assert.deepStrictEqual(getClassNames(file), {
    classNames: ['message-1', 'default-1', 'message-2'],
    errors: ['Could not analyze {{or}} in template, line 2.'],
  });
});
