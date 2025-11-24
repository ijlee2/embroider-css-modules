import { assert, test } from '@codemod-utils/tests';

import { getClasses } from '../../../src/utils/css/index.js';

test('utils | get-classes > error case (3)', function () {
  const file = [
    `<div class={{get-class @type}}></div>`,
    `<div class={{getClass @type}}></div>`,
  ].join('\n');

  assert.deepStrictEqual(getClasses(file), {
    classes: [],
    errors: [
      'Could not analyze {{get-class}} in template, line 1.',
      'Could not analyze {{getClass}} in template, line 2.',
    ],
  });
});
