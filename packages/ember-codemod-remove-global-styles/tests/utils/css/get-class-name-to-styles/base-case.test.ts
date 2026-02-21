import { assert, test } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';

test('utils | css | get-class-name-to-styles > base case', function () {
  const file = '';

  assert.deepStrictEqual(getClassNameToStyles(file), new Map());
});
