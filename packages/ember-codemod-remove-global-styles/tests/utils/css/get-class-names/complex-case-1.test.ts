import { assert, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';
import { templateFile } from '../../../helpers/utils/css/complex-case-1.js';

test('utils | css | get-class-names > complex case (1)', function () {
  const output = getClassNames(templateFile);

  assert.deepStrictEqual(output, {
    classNames: [
      'container',
      'is-inline',
      'is-wide',
      'no-feedback',
      'label',
      'field',
      'feedback',
      'is-error',
      'message',
    ],
    errors: [],
  });
});
