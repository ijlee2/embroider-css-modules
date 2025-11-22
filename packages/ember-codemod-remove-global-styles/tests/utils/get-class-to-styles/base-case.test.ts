import { assert, test } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../src/utils/css/index.js';

test('utils | get-class-to-styles > base case', function () {
  const file = '';

  assert.deepStrictEqual(getClassToStyles(file), new Map());
});
