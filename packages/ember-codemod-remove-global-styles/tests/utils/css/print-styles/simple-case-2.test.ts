import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > simple case (2)', function () {
  const styles = [
    {
      classes: ['link'],
      code: normalizeFile([
        `.link {`,
        `  display: inline-block;`,
        `  font-size: 0.875rem;`,
        `  padding: 0.875rem 1rem;`,
        `  text-decoration: none;`,
        `  white-space: nowrap;`,
        `}`,
      ]),
      location: {
        end: { column: 1, line: 12, offset: 182 },
        start: { column: 1, line: 6, offset: 51 },
      },
      selector: '.link',
    },
    {
      classes: ['link'],
      code: normalizeFile([
        `.link:global(\\.active) {`,
        `  background-color: #15202d;`,
        `}`,
      ]),
      location: {
        end: { column: 1, line: 16, offset: 238 },
        start: { column: 1, line: 14, offset: 184 },
      },
      selector: '.link:global(\\.active)',
    },
    {
      classes: ['link'],
      code: normalizeFile([
        `.link:hover {`,
        `  background-color: #26313d;`,
        `  transition: background-color 0.17s;`,
        `}`,
      ]),
      location: {
        end: { column: 1, line: 21, offset: 322 },
        start: { column: 1, line: 18, offset: 240 },
      },
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
