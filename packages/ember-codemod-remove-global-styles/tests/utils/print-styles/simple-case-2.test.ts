import { assert, test } from '@codemod-utils/tests';

import { printStyles } from '../../../src/utils/css/index.js';

test('utils | print-styles > simple case (2)', function () {
  const styles = [
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 12, offset: 182 },
        start: { column: 1, line: 6, offset: 51 },
      },
      raw:
        '.link {\n' +
        '  display: inline-block;\n' +
        '  font-size: 0.875rem;\n' +
        '  padding: 0.875rem 1rem;\n' +
        '  text-decoration: none;\n' +
        '  white-space: nowrap;\n' +
        '}',
      selector: '.link',
    },
    {
      classes: ['link', 'active'],
      location: {
        end: { column: 1, line: 16, offset: 238 },
        start: { column: 1, line: 14, offset: 184 },
      },
      raw: '.link:global(.active) {\n  background-color: #15202d;\n}',
      selector: '.link:global(.active)',
    },
    {
      classes: ['link'],
      location: {
        end: { column: 1, line: 21, offset: 322 },
        start: { column: 1, line: 18, offset: 240 },
      },
      raw:
        '.link:hover {\n' +
        '  background-color: #26313d;\n' +
        '  transition: background-color 0.17s;\n' +
        '}',
      selector: '.link:hover',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    [
      `.link {`,
      `  display: inline-block;`,
      `  font-size: 0.875rem;`,
      `  padding: 0.875rem 1rem;`,
      `  text-decoration: none;`,
      `  white-space: nowrap;`,
      `}`,
      ``,
      `.link:global(.active) {`,
      `  background-color: #15202d;`,
      `}`,
      ``,
      `.link:hover {`,
      `  background-color: #26313d;`,
      `  transition: background-color 0.17s;`,
      `}`,
    ].join('\n'),
  );
});
