import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';

test('utils | css | get-class-names > error case (1)', function () {
  const file = normalizeFile([
    `<div class="message-1 {{@type}}"></div>`,
    `<div class="message-2 {{this.type}}"></div>`,
  ]);

  assert.deepStrictEqual(getClassNames(file), {
    classNames: ['message-1', 'message-2'],
    errors: [
      'Could not analyze {{@type}} in template, line 1.',
      'Could not analyze {{this.type}} in template, line 2.',
    ],
  });
});
