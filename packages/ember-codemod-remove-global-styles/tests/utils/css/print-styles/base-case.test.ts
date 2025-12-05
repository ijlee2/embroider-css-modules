import { assert, test } from '@codemod-utils/tests';

import type { Style } from '../../../../src/types/index.js';
import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > base case', function () {
  const styles: Style[] = [];

  assert.strictEqual(printStyles(styles), '');
});
