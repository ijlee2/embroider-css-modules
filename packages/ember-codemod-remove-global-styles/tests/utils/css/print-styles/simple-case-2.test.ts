import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > simple case (2)', function () {
  const styles = [
    {
      classNames: ['link'],
      code: normalizeFile([
        `.link {`,
        `  display: inline-block;`,
        `  font-size: 0.875rem;`,
        `  padding: 0.875rem 1rem;`,
        `  text-decoration: none;`,
        `  white-space: nowrap;`,
        `}`,
      ]),
      line: 6,
      selector: '.link',
    },
    {
      classNames: ['link'],
      code: normalizeFile([
        `.link:global(\\.active) {`,
        `  background-color: #15202d;`,
        `}`,
      ]),
      line: 14,
      selector: '.link:global(\\.active)',
    },
    {
      classNames: ['link'],
      code: normalizeFile([
        `.link:hover {`,
        `  background-color: #26313d;`,
        `  transition: background-color 0.17s;`,
        `}`,
      ]),
      line: 18,
      selector: '.link:hover',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    normalizeFile([
      `.link {`,
      `  display: inline-block;`,
      `  font-size: 0.875rem;`,
      `  padding: 0.875rem 1rem;`,
      `  text-decoration: none;`,
      `  white-space: nowrap;`,
      `}`,
      ``,
      `.link:global(\\.active) {`,
      `  background-color: #15202d;`,
      `}`,
      ``,
      `.link:hover {`,
      `  background-color: #26313d;`,
      `  transition: background-color 0.17s;`,
      `}`,
    ]),
  );
});
