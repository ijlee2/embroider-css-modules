import { assert, test } from '@codemod-utils/tests';

import { addLocalClasses } from '../../../../src/utils/css/index.js';
import {
  classNameToStyles,
  templateFile,
} from '../../../helpers/utils/css/base-case.js';

test('utils | css | add-local-classes > base case', function () {
  let output = addLocalClasses(templateFile, {
    classNameToStyles,
    isHbs: false,
  });

  assert.strictEqual(output, '');

  output = addLocalClasses(templateFile, {
    classNameToStyles,
    isHbs: true,
  });

  assert.strictEqual(output, '');
});
