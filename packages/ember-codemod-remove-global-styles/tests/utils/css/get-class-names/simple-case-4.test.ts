import { assert, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';
import { templateFile } from '../../../helpers/utils/css/simple-case-4.js';

test('utils | css | get-class-names > simple case (4)', function () {
  const output = getClassNames(templateFile);

  assert.deepStrictEqual(output, {
    classNames: ['checkbox', 'is-checked', 'is-disabled', 'checkmark-icon'],
    errors: [],
  });
});
