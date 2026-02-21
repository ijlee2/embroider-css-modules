import { assert, test } from '@codemod-utils/tests';

import { classNameToStyles } from '../../../helpers/utils/css/base-case.js';

test('utils | css | get-class-name-to-styles > base case', function () {
  assert.deepStrictEqual(classNameToStyles, new Map());
});
