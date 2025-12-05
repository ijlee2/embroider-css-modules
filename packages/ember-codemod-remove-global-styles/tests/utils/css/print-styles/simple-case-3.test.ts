import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > simple case (3)', function () {
  const styles = [
    {
      classes: ['input'],
      location: {
        end: { column: 1, line: 5, offset: 104 },
        start: { column: 1, line: 1, offset: 0 },
      },
      raw: normalizeFile([
        `.input {`,
        `  border: 0.125rem solid #ffd54f;`,
        `  padding: 0.125rem 0.25rem;`,
        `  width: calc(100% - 0.75rem);`,
        `}`,
      ]),
      selector: '.input',
    },
    {
      classes: ['input'],
      location: {
        end: { column: 1, line: 10, offset: 165 },
        start: { column: 1, line: 7, offset: 106 },
      },
      raw: normalizeFile([
        `.input:focus {`,
        `  background-color: #ffecb3;`,
        `  outline: 0;`,
        `}`,
      ]),
      selector: '.input:focus',
    },
    {
      classes: ['input'],
      location: {
        end: { column: 1, line: 14, offset: 218 },
        start: { column: 1, line: 12, offset: 167 },
      },
      raw: normalizeFile([
        `.input:not(:focus) {`,
        `  border-color: transparent;`,
        `}`,
      ]),
      selector: '.input:not(:focus)',
    },
    {
      classes: ['input'],
      location: {
        end: { column: 1, line: 18, offset: 265 },
        start: { column: 1, line: 16, offset: 220 },
      },
      raw: normalizeFile([
        `.input::placeholder {`,
        `  font-style: italic;`,
        `}`,
      ]),
      selector: '.input::placeholder',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    normalizeFile([
      `.input {`,
      `  border: 0.125rem solid #ffd54f;`,
      `  padding: 0.125rem 0.25rem;`,
      `  width: calc(100% - 0.75rem);`,
      `}`,
      ``,
      `.input:focus {`,
      `  background-color: #ffecb3;`,
      `  outline: 0;`,
      `}`,
      ``,
      `.input:not(:focus) {`,
      `  border-color: transparent;`,
      `}`,
      ``,
      `.input::placeholder {`,
      `  font-style: italic;`,
      `}`,
    ]),
  );
});
