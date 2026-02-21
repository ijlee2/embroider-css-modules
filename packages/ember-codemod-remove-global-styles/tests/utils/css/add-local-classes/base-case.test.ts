import { assert, test } from '@codemod-utils/tests';

import type { ClassNameToStyles } from '../../../../src/types/index.js';
import { addLocalClasses } from '../../../../src/utils/css/index.js';

test('utils | css | add-local-classes > base case', function () {
  const file = '';

  const classNameToStyles: ClassNameToStyles = new Map();

  assert.strictEqual(
    addLocalClasses(file, {
      classNameToStyles,
      isHbs: false,
    }),
    '',
  );

  assert.strictEqual(
    addLocalClasses(file, {
      classNameToStyles,
      isHbs: true,
    }),
    '',
  );
});
