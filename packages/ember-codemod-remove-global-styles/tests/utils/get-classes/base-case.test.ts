import { assert, test } from '@codemod-utils/tests';

import { getClasses } from '../../../src/utils/css/index.js';

test('utils | get-classes > base case', function () {
  const file = '';

  assert.deepStrictEqual(getClasses(file), {
    classes: [],
    errors: [],
  });
});
