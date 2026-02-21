import { assert, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';

test('utils | css | get-class-names > base case', function () {
  const file = '';

  assert.deepStrictEqual(getClassNames(file), {
    classNames: [],
    errors: [],
  });
});
