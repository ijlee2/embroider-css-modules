import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getClasses } from '../../../../src/utils/css/index.js';

test('utils | css | get-classes > error case (3)', function () {
  const file = normalizeFile([
    `<div class={{get-class @type}}></div>`,
    `<div class={{getClass @type}}></div>`,
  ]);

  assert.deepStrictEqual(getClasses(file), {
    classNames: [],
    errors: [
      'Could not analyze {{get-class}} in template, line 1.',
      'Could not analyze {{getClass}} in template, line 2.',
    ],
  });
});
