import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > complex case (2)', function () {
  const styles = [
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 66, offset: 1125 },
        start: { column: 1, line: 56, offset: 847 },
      },
      raw: normalizeFile([
        `.link {`,
        `  background: transparent;`,
        `  border: 0.0625rem solid rgb(247 252 251 / 50%);`,
        `  border-radius: 0.15rem;`,
        `  color: rgb(247 252 251 / 90%);`,
        `  font-family: Raleway, sans-serif;`,
        `  font-size: 0.875rem;`,
        `  margin-top: 0.5rem;`,
        `  padding: 0.25rem 0.5rem;`,
        `  text-decoration: none;`,
        `}`,
      ]),
      selector: '.link',
    },
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 75, offset: 1232 },
        start: { column: 1, line: 68, offset: 1127 },
      },
      raw: normalizeFile([
        `.link::after {`,
        `  content: "";`,
        `  height: 100%;`,
        `  left: 0;`,
        `  position: absolute;`,
        `  top: 0;`,
        `  width: 100%;`,
        `}`,
      ]),
      selector: '.link::after',
    },
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 79, offset: 1263 },
        start: { column: 1, line: 77, offset: 1234 },
      },
      raw: normalizeFile([`.link:focus {`, `  outline: 0;`, `}`]),
      selector: '.link:focus',
    },
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 83, offset: 1315 },
        start: { column: 1, line: 81, offset: 1265 },
      },
      raw: normalizeFile([
        `.link:focus::after {`,
        `  border: 1px solid orange;`,
        `}`,
      ]),
      selector: '.link:focus::after',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    normalizeFile([
      `.link {`,
      `  background: transparent;`,
      `  border: 0.0625rem solid rgb(247 252 251 / 50%);`,
      `  border-radius: 0.15rem;`,
      `  color: rgb(247 252 251 / 90%);`,
      `  font-family: Raleway, sans-serif;`,
      `  font-size: 0.875rem;`,
      `  margin-top: 0.5rem;`,
      `  padding: 0.25rem 0.5rem;`,
      `  text-decoration: none;`,
      `}`,
      ``,
      `.link::after {`,
      `  content: "";`,
      `  height: 100%;`,
      `  left: 0;`,
      `  position: absolute;`,
      `  top: 0;`,
      `  width: 100%;`,
      `}`,
      ``,
      `.link:focus {`,
      `  outline: 0;`,
      `}`,
      ``,
      `.link:focus::after {`,
      `  border: 1px solid orange;`,
      `}`,
    ]),
  );
});
