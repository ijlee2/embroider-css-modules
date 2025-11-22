import { assert, test } from '@codemod-utils/tests';

import { printStyles } from '../../../src/utils/css/index.js';

test('utils | print-styles > complex case (2)', function () {
  const styles = [
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 66, offset: 1125 },
        start: { column: 1, line: 56, offset: 847 },
      },
      raw:
        '.link {\n' +
        '  background: transparent;\n' +
        '  border: 0.0625rem solid rgb(247 252 251 / 50%);\n' +
        '  border-radius: 0.15rem;\n' +
        '  color: rgb(247 252 251 / 90%);\n' +
        '  font-family: Raleway, sans-serif;\n' +
        '  font-size: 0.875rem;\n' +
        '  margin-top: 0.5rem;\n' +
        '  padding: 0.25rem 0.5rem;\n' +
        '  text-decoration: none;\n' +
        '}',
      selector: '.link',
    },
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 75, offset: 1232 },
        start: { column: 1, line: 68, offset: 1127 },
      },
      raw:
        '.link::after {\n' +
        '  content: "";\n' +
        '  height: 100%;\n' +
        '  left: 0;\n' +
        '  position: absolute;\n' +
        '  top: 0;\n' +
        '  width: 100%;\n' +
        '}',
      selector: '.link::after',
    },
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 79, offset: 1263 },
        start: { column: 1, line: 77, offset: 1234 },
      },
      raw: '.link:focus {\n  outline: 0;\n}',
      selector: '.link:focus',
    },
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 83, offset: 1315 },
        start: { column: 1, line: 81, offset: 1265 },
      },
      raw: '.link:focus::after {\n  border: 1px solid orange;\n}',
      selector: '.link:focus::after',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    [
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
    ].join('\n'),
  );
});
