import { assert, test } from '@codemod-utils/tests';

import { getClasses } from '../../../src/utils/css/index.js';

test('utils | get-classes > error case (2)', function () {
  const file = [
    `<div class="message-1 {{if @type @type "default-1"}}"></div>`,
    `<div class="message-2 {{or @type "default-2"}}"></div>`,
  ].join('\n');

  assert.deepStrictEqual(getClasses(file), {
    classes: ['message-1', 'default-1', 'message-2'],
    errors: ['Could not analyze {{or}} in template, line 2.'],
  });
});
