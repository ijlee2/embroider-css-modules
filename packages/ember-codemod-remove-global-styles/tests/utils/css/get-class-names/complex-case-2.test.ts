import { assert, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css/index.js';
import { templateFile } from '../../../helpers/utils/css/complex-case-2.js';

test('utils | css | get-class-names > complex case (2)', function () {
  const output = getClassNames(templateFile);

  assert.deepStrictEqual(output, {
    classNames: [
      'container',
      'header',
      'name',
      'image-container',
      'body',
      'description',
      'price',
      'actions',
      'link',
    ],
    errors: [],
  });
});
