import { assert, test } from '@codemod-utils/tests';

import { printStyles } from '../../../src/utils/css/index.js';

test('utils | print-styles > simple case (4)', function () {
  const styles = [
    {
      classes: ['checkmark-icon'],
      location: {
        end: { column: 1, line: 24, offset: 370 },
        start: { column: 1, line: 22, offset: 335 },
      },
      raw: '.checkmark-icon {\n  color: white;\n}',
      selector: '.checkmark-icon',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    [`.checkmark-icon {`, `  color: white;`, `}`].join('\n'),
  );
});
