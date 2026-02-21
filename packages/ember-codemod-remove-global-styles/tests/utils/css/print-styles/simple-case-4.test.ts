import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > simple case (4)', function () {
  const styles = [
    {
      classNames: ['checkmark-icon'],
      code: normalizeFile([`.checkmark-icon {`, `  color: white;`, `}`]),
      line: 22,
      selector: '.checkmark-icon',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    normalizeFile([`.checkmark-icon {`, `  color: white;`, `}`]),
  );
});
