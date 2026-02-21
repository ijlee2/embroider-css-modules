import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > simple case (1)', function () {
  const styles = [
    {
      classes: ['image'],
      code: normalizeFile([
        `.image {`,
        `  aspect-ratio: 4 / 3;`,
        `  border-radius: 0.75rem;`,
        `  width: 100%;`,
        `}`,
      ]),
      location: {
        end: { column: 1, line: 6, offset: 94 },
        start: { column: 1, line: 1, offset: 0 },
      },
      selector: '.image',
    },
    {
      classes: ['image'],
      code: normalizeFile([`.image {`, `  object-fit: cover;`, `}`]),
      location: {
        end: { column: 1, line: 10, offset: 127 },
        start: { column: 1, line: 8, offset: 96 },
      },
      selector: '.image',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    normalizeFile([
      `.image {`,
      `  aspect-ratio: 4 / 3;`,
      `  border-radius: 0.75rem;`,
      `  width: 100%;`,
      `}`,
      ``,
      `.image {`,
      `  object-fit: cover;`,
      `}`,
    ]),
  );
});
