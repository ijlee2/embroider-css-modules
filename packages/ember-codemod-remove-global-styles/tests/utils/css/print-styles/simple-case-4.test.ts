import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > simple case (4)', function () {
  const styles = [
    {
      classes: ['checkmark-icon'],
      code: normalizeFile([`.checkmark-icon {`, `  color: white;`, `}`]),
      location: {
        end: { column: 1, line: 24, offset: 370 },
        start: { column: 1, line: 22, offset: 335 },
      },
      selector: '.checkmark-icon',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    normalizeFile([`.checkmark-icon {`, `  color: white;`, `}`]),
  );
});
