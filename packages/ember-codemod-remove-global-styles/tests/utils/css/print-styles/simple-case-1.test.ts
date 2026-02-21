import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > simple case (1)', function () {
  const styles = [
    {
      classNames: ['image'],
      code: normalizeFile([
        `.image {`,
        `  aspect-ratio: 4 / 3;`,
        `  border-radius: 0.75rem;`,
        `  width: 100%;`,
        `}`,
      ]),
      line: 1,
      selector: '.image',
    },
    {
      classNames: ['image'],
      code: normalizeFile([`.image {`, `  object-fit: cover;`, `}`]),
      line: 8,
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
