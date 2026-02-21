import { assert, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';
import { templateFile } from '../../../helpers/utils/css/base-case.js';

test('utils | css | get-class-names > base case', function () {
  const output = getClassNames(templateFile);

  assert.deepStrictEqual(output, {
    classNames: [],
    errors: [],
  });
});
