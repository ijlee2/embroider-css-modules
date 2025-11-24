import { assert, test } from '@codemod-utils/tests';

import type { ClassToStyles } from '../../../src/types/index.js';
import { addLocalClasses } from '../../../src/utils/css/index.js';

test('utils | add-local-classes > base case', function () {
  const file = '';

  const classToStyles: ClassToStyles = new Map();

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: false,
    }),
    '',
  );

  assert.strictEqual(
    addLocalClasses(file, {
      classToStyles,
      isHbs: true,
    }),
    '',
  );
});
