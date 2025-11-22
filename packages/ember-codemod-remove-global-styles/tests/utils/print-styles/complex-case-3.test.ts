import { assert, test } from '@codemod-utils/tests';

import { printStyles } from '../../../src/utils/css/index.js';

test('utils | print-styles > complex case (3)', function () {
  const styles = [
    {
      classes: ['container'],
      location: {
        end: { column: 1, line: 13, offset: 267 },
        start: { column: 1, line: 1, offset: 0 },
      },
      raw:
        '.container {\n' +
        '  column-gap: 2.5rem;\n' +
        '  display: grid;\n' +
        '  grid-template-areas:\n' +
        '    "summary summary"\n' +
        '    "previous-button next-button";\n' +
        '  grid-template-columns: 1fr 1fr;\n' +
        '  grid-template-rows: 1fr auto;\n' +
        '  height: 100%;\n' +
        '  overflow: hidden;\n' +
        '  row-gap: 1rem;\n' +
        '  width: 100%;\n' +
        '}',
      selector: '.container',
    },
    {
      classes: ['container', 'flat'],
      location: {
        end: { column: 1, line: 90, offset: 1582 },
        start: { column: 1, line: 85, offset: 1396 },
      },
      raw:
        '.container.flat {\n' +
        '  column-gap: 1rem;\n' +
        '  grid-template-areas: "previous-button summary next-button";\n' +
        '  grid-template-columns: 2.5rem 1fr 2.5rem;\n' +
        '  grid-template-rows: minmax(3rem, 1fr);\n' +
        '}',
      selector: '.container.flat',
    },
    {
      classes: ['container', 'flat', 'summary', 'horizontal-layout'],
      location: {
        end: { column: 1, line: 97, offset: 1779 },
        start: { column: 1, line: 92, offset: 1584 },
      },
      raw:
        '.container.flat .summary.horizontal-layout {\n' +
        '  gap: 0.5rem;\n' +
        '  grid-template-areas: "music-format annual-revenue relevant-years";\n' +
        '  grid-template-columns: 40% 1fr 1fr;\n' +
        '  grid-template-rows: 1fr;\n' +
        '}',
      selector: '.container.flat .summary.horizontal-layout',
    },
    {
      classes: ['container', 'flat', 'annual-revenue'],
      location: {
        end: { column: 1, line: 103, offset: 1892 },
        start: { column: 1, line: 99, offset: 1781 },
      },
      raw:
        '.container.flat .annual-revenue {\n' +
        '  display: flex;\n' +
        '  flex-direction: column;\n' +
        '}',
      selector: '.container.flat .annual-revenue',
    },
    {
      classes: ['container', 'flat', 'relevant-years'],
      location: {
        end: { column: 1, line: 103, offset: 1892 },
        start: { column: 1, line: 99, offset: 1781 },
      },
      raw:
        '.container.flat .relevant-years {\n' +
        '  display: flex;\n' +
        '  flex-direction: column;\n' +
        '}',
      selector: '.container.flat .relevant-years',
    },
    {
      classes: ['container', 'flat', 'previous-button'],
      location: {
        end: { column: 1, line: 109, offset: 2037 },
        start: { column: 1, line: 105, offset: 1894 },
      },
      raw:
        '.container.flat .previous-button {\n' +
        '  background: linear-gradient(36deg, #7cb342 16%, #4b830d 84%);\n' +
        '  border: 0;\n' +
        '}',
      selector: '.container.flat .previous-button',
    },
    {
      classes: ['container', 'flat', 'next-button'],
      location: {
        end: { column: 1, line: 109, offset: 2037 },
        start: { column: 1, line: 105, offset: 1894 },
      },
      raw:
        '.container.flat .next-button {\n' +
        '  background: linear-gradient(36deg, #7cb342 16%, #4b830d 84%);\n' +
        '  border: 0;\n' +
        '}',
      selector: '.container.flat .next-button',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    [
      `.container {`,
      `  column-gap: 2.5rem;`,
      `  display: grid;`,
      `  grid-template-areas:`,
      `    "summary summary"`,
      `    "previous-button next-button";`,
      `  grid-template-columns: 1fr 1fr;`,
      `  grid-template-rows: 1fr auto;`,
      `  height: 100%;`,
      `  overflow: hidden;`,
      `  row-gap: 1rem;`,
      `  width: 100%;`,
      `}`,
      ``,
      `.container.flat {`,
      `  column-gap: 1rem;`,
      `  grid-template-areas: "previous-button summary next-button";`,
      `  grid-template-columns: 2.5rem 1fr 2.5rem;`,
      `  grid-template-rows: minmax(3rem, 1fr);`,
      `}`,
      ``,
      `.container.flat .summary.horizontal-layout {`,
      `  gap: 0.5rem;`,
      `  grid-template-areas: "music-format annual-revenue relevant-years";`,
      `  grid-template-columns: 40% 1fr 1fr;`,
      `  grid-template-rows: 1fr;`,
      `}`,
      ``,
      `.container.flat .annual-revenue {`,
      `  display: flex;`,
      `  flex-direction: column;`,
      `}`,
      ``,
      `.container.flat .relevant-years {`,
      `  display: flex;`,
      `  flex-direction: column;`,
      `}`,
      ``,
      `.container.flat .previous-button {`,
      `  background: linear-gradient(36deg, #7cb342 16%, #4b830d 84%);`,
      `  border: 0;`,
      `}`,
      ``,
      `.container.flat .next-button {`,
      `  background: linear-gradient(36deg, #7cb342 16%, #4b830d 84%);`,
      `  border: 0;`,
      `}`,
    ].join('\n'),
  );
});
