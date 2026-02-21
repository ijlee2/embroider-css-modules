import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > complex case (2)', function () {
  const styles = [
    {
      classNames: ['link'],
      code: normalizeFile([
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
      line: 56,
      selector: '.link',
    },
    {
      classNames: ['link'],
      code: normalizeFile([
        `.link::after {`,
        `  content: "";`,
        `  height: 100%;`,
        `  left: 0;`,
        `  position: absolute;`,
        `  top: 0;`,
        `  width: 100%;`,
        `}`,
      ]),
      line: 68,
      selector: '.link::after',
    },
    {
      classNames: ['link'],
      code: normalizeFile([`.link:focus {`, `  outline: 0;`, `}`]),
      line: 77,
      selector: '.link:focus',
    },
    {
      classNames: ['link'],
      code: normalizeFile([
        `.link:focus::after {`,
        `  border: 1px solid orange;`,
        `}`,
      ]),
      line: 81,
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
