import { assert, test } from '@codemod-utils/tests';

import { printStyles } from '../../../src/utils/css/index.js';

test('utils | print-styles > failed case (2)', function () {
  const styles = [
    {
      classes: ['widgets'],
      location: {
        end: { column: 1, line: 12, offset: 229 },
        start: { column: 1, line: 1, offset: 0 },
      },
      raw:
        '.widgets {\n' +
        '  display: grid;\n' +
        '  gap: 1rem;\n' +
        '  grid-template-areas:\n' +
        '    "widget-1"\n' +
        '    "widget-2"\n' +
        '    "widget-3"\n' +
        '    "widget-4"\n' +
        '    "widget-5";\n' +
        '  grid-template-columns: 1fr;\n' +
        '  grid-template-rows: repeat(4, minmax(12rem, 75%)) 5rem;\n' +
        '}',
      selector: '.widgets',
    },
    {
      classes: ['widgets'],
      location: {
        end: { column: 5, line: 53, offset: 1005 },
        start: { column: 5, line: 51, offset: 942 },
      },
      raw: '.widgets {\n      grid-template-rows: repeat(4, 25%) 5rem;\n    }',
      selector: '.widgets',
    },
    {
      classes: ['widgets'],
      location: {
        end: { column: 3, line: 67, offset: 1313 },
        start: { column: 3, line: 58, offset: 1073 },
      },
      raw:
        '.widgets {\n' +
        '    grid-template-areas:\n' +
        '      "widget-1 widget-2"\n' +
        '      "widget-4 widget-2"\n' +
        '      "widget-4 widget-3"\n' +
        '      "widget-5 widget-3";\n' +
        '    grid-template-columns: 2fr 5fr;\n' +
        '    grid-template-rows: 3fr 1fr 2fr 1fr;\n' +
        '    height: 40rem;\n' +
        '  }',
      selector: '.widgets',
    },
    {
      classes: ['widgets'],
      location: {
        end: { column: 5, line: 72, offset: 1408 },
        start: { column: 5, line: 70, offset: 1348 },
      },
      raw: '.widgets {\n      grid-template-rows: 3fr 1fr 2fr 5rem;\n    }',
      selector: '.widgets',
    },
    {
      classes: ['widgets'],
      location: {
        end: { column: 3, line: 85, offset: 1728 },
        start: { column: 3, line: 77, offset: 1455 },
      },
      raw:
        '.widgets {\n' +
        '    grid-template-areas:\n' +
        '      "widget-1 widget-2 widget-4"\n' +
        '      "widget-3 widget-3 widget-4"\n' +
        '      "widget-3 widget-3 widget-5";\n' +
        '    grid-template-columns: minmax(25%, 15rem) minmax(50%, 15rem) auto;\n' +
        '    grid-template-rows: 12fr 3fr 5fr;\n' +
        '    height: 40rem;\n' +
        '  }',
      selector: '.widgets',
    },
    {
      classes: ['widgets'],
      location: {
        end: { column: 5, line: 90, offset: 1820 },
        start: { column: 5, line: 88, offset: 1763 },
      },
      raw: '.widgets {\n      grid-template-rows: 4fr 1fr 10rem;\n    }',
      selector: '.widgets',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    [
      `.widgets {`,
      `  display: grid;`,
      `  gap: 1rem;`,
      `  grid-template-areas:`,
      `    "widget-1"`,
      `    "widget-2"`,
      `    "widget-3"`,
      `    "widget-4"`,
      `    "widget-5";`,
      `  grid-template-columns: 1fr;`,
      `  grid-template-rows: repeat(4, minmax(12rem, 75%)) 5rem;`,
      `}`,
      ``,
      `.widgets {`,
      `      grid-template-rows: repeat(4, 25%) 5rem;`,
      `    }`,
      ``,
      `.widgets {`,
      `    grid-template-areas:`,
      `      "widget-1 widget-2"`,
      `      "widget-4 widget-2"`,
      `      "widget-4 widget-3"`,
      `      "widget-5 widget-3";`,
      `    grid-template-columns: 2fr 5fr;`,
      `    grid-template-rows: 3fr 1fr 2fr 1fr;`,
      `    height: 40rem;`,
      `  }`,
      ``,
      `.widgets {`,
      `      grid-template-rows: 3fr 1fr 2fr 5rem;`,
      `    }`,
      ``,
      `.widgets {`,
      `    grid-template-areas:`,
      `      "widget-1 widget-2 widget-4"`,
      `      "widget-3 widget-3 widget-4"`,
      `      "widget-3 widget-3 widget-5";`,
      `    grid-template-columns: minmax(25%, 15rem) minmax(50%, 15rem) auto;`,
      `    grid-template-rows: 12fr 3fr 5fr;`,
      `    height: 40rem;`,
      `  }`,
      ``,
      `.widgets {`,
      `      grid-template-rows: 4fr 1fr 10rem;`,
      `    }`,
    ].join('\n'),
  );
});
