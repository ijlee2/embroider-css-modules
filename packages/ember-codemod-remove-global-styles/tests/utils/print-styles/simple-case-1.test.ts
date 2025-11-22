import { assert, test } from '@codemod-utils/tests';

import { printStyles } from '../../../src/utils/css/index.js';

test('utils | print-styles > simple case (1)', function () {
  const styles = [
    {
      classes: ['image'],
      location: {
        end: { column: 1, line: 6, offset: 94 },
        start: { column: 1, line: 1, offset: 0 },
      },
      raw: '.image {\n  aspect-ratio: 4 / 3;\n  border-radius: 0.75rem;\n  width: 100%;\n}',
      selector: '.image',
    },
    {
      classes: ['image'],
      location: {
        end: { column: 1, line: 10, offset: 127 },
        start: { column: 1, line: 8, offset: 96 },
      },
      raw: '.image {\n  object-fit: cover;\n}',
      selector: '.image',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    [
      `.image {`,
      `  aspect-ratio: 4 / 3;`,
      `  border-radius: 0.75rem;`,
      `  width: 100%;`,
      `}`,
      ``,
      `.image {`,
      `  object-fit: cover;`,
      `}`,
    ].join('\n'),
  );
});
