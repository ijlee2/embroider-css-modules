import { assert, test } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../src/utils/css/index.js';

test('utils | get-class-to-styles > failed case (2)', function () {
  const file = [
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
    `.widget-1,`,
    `.widget-2,`,
    `.widget-3,`,
    `.widget-4,`,
    `.widget-5 {`,
    `  border-radius: 0.125rem;`,
    `  overflow: hidden;`,
    `  padding: 0.75rem;`,
    `}`,
    ``,
    `.widget-1 {`,
    `  background: linear-gradient(126deg, #e91e63 16%, #ff6090 84%);`,
    `  grid-area: widget-1;`,
    `}`,
    ``,
    `.widget-2 {`,
    `  background: linear-gradient(126deg, #7cb342 16%, #aee571 84%);`,
    `  grid-area: widget-2;`,
    `}`,
    ``,
    `.widget-3 {`,
    `  background: linear-gradient(126deg, #ffa000 16%, #ffd149 84%);`,
    `  grid-area: widget-3;`,
    `}`,
    ``,
    `.widget-4 {`,
    `  background: linear-gradient(126deg, #03a9f4 16%, #67daff 84%);`,
    `  grid-area: widget-4;`,
    `}`,
    ``,
    `.widget-5 {`,
    `  background: linear-gradient(126deg, #9c27b0 16%, #d05ce3 84%);`,
    `  grid-area: widget-5;`,
    `}`,
    ``,
    `@media screen and (width <= 30rem) {`,
    `  @media (height >= 40rem) {`,
    `    .widgets {`,
    `      grid-template-rows: repeat(4, 25%) 5rem;`,
    `    }`,
    `  }`,
    `}`,
    ``,
    `@media screen and (width >= 30rem) and (width <= 60rem) {`,
    `  .widgets {`,
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
    `  @media (height >= 40rem) {`,
    `    .widgets {`,
    `      grid-template-rows: 3fr 1fr 2fr 5rem;`,
    `    }`,
    `  }`,
    `}`,
    ``,
    `@media screen and (width >= 60rem) {`,
    `  .widgets {`,
    `    grid-template-areas:`,
    `      "widget-1 widget-2 widget-4"`,
    `      "widget-3 widget-3 widget-4"`,
    `      "widget-3 widget-3 widget-5";`,
    `    grid-template-columns: minmax(25%, 15rem) minmax(50%, 15rem) auto;`,
    `    grid-template-rows: 12fr 3fr 5fr;`,
    `    height: 40rem;`,
    `  }`,
    ``,
    `  @media (height >= 40rem) {`,
    `    .widgets {`,
    `      grid-template-rows: 4fr 1fr 10rem;`,
    `    }`,
    `  }`,
    `}`,
    ``,
  ].join('\n');

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'widgets',
        [
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
        ],
      ],
      [
        'widget-1',
        [
          {
            classes: ['widget-1'],
            location: {
              end: { column: 1, line: 22, offset: 355 },
              start: { column: 1, line: 14, offset: 231 },
            },
            raw:
              '.widget-1 {\n' +
              '  border-radius: 0.125rem;\n' +
              '  overflow: hidden;\n' +
              '  padding: 0.75rem;\n' +
              '}',
            selector: '.widget-1',
          },
          {
            classes: ['widget-1'],
            location: {
              end: { column: 1, line: 27, offset: 458 },
              start: { column: 1, line: 24, offset: 357 },
            },
            raw:
              '.widget-1 {\n' +
              '  background: linear-gradient(126deg, #e91e63 16%, #ff6090 84%);\n' +
              '  grid-area: widget-1;\n' +
              '}',
            selector: '.widget-1',
          },
        ],
      ],
      [
        'widget-2',
        [
          {
            classes: ['widget-2'],
            location: {
              end: { column: 1, line: 22, offset: 355 },
              start: { column: 1, line: 14, offset: 231 },
            },
            raw:
              '.widget-2 {\n' +
              '  border-radius: 0.125rem;\n' +
              '  overflow: hidden;\n' +
              '  padding: 0.75rem;\n' +
              '}',
            selector: '.widget-2',
          },
          {
            classes: ['widget-2'],
            location: {
              end: { column: 1, line: 32, offset: 561 },
              start: { column: 1, line: 29, offset: 460 },
            },
            raw:
              '.widget-2 {\n' +
              '  background: linear-gradient(126deg, #7cb342 16%, #aee571 84%);\n' +
              '  grid-area: widget-2;\n' +
              '}',
            selector: '.widget-2',
          },
        ],
      ],
      [
        'widget-3',
        [
          {
            classes: ['widget-3'],
            location: {
              end: { column: 1, line: 22, offset: 355 },
              start: { column: 1, line: 14, offset: 231 },
            },
            raw:
              '.widget-3 {\n' +
              '  border-radius: 0.125rem;\n' +
              '  overflow: hidden;\n' +
              '  padding: 0.75rem;\n' +
              '}',
            selector: '.widget-3',
          },
          {
            classes: ['widget-3'],
            location: {
              end: { column: 1, line: 37, offset: 664 },
              start: { column: 1, line: 34, offset: 563 },
            },
            raw:
              '.widget-3 {\n' +
              '  background: linear-gradient(126deg, #ffa000 16%, #ffd149 84%);\n' +
              '  grid-area: widget-3;\n' +
              '}',
            selector: '.widget-3',
          },
        ],
      ],
      [
        'widget-4',
        [
          {
            classes: ['widget-4'],
            location: {
              end: { column: 1, line: 22, offset: 355 },
              start: { column: 1, line: 14, offset: 231 },
            },
            raw:
              '.widget-4 {\n' +
              '  border-radius: 0.125rem;\n' +
              '  overflow: hidden;\n' +
              '  padding: 0.75rem;\n' +
              '}',
            selector: '.widget-4',
          },
          {
            classes: ['widget-4'],
            location: {
              end: { column: 1, line: 42, offset: 767 },
              start: { column: 1, line: 39, offset: 666 },
            },
            raw:
              '.widget-4 {\n' +
              '  background: linear-gradient(126deg, #03a9f4 16%, #67daff 84%);\n' +
              '  grid-area: widget-4;\n' +
              '}',
            selector: '.widget-4',
          },
        ],
      ],
      [
        'widget-5',
        [
          {
            classes: ['widget-5'],
            location: {
              end: { column: 1, line: 22, offset: 355 },
              start: { column: 1, line: 14, offset: 231 },
            },
            raw:
              '.widget-5 {\n' +
              '  border-radius: 0.125rem;\n' +
              '  overflow: hidden;\n' +
              '  padding: 0.75rem;\n' +
              '}',
            selector: '.widget-5',
          },
          {
            classes: ['widget-5'],
            location: {
              end: { column: 1, line: 47, offset: 870 },
              start: { column: 1, line: 44, offset: 769 },
            },
            raw:
              '.widget-5 {\n' +
              '  background: linear-gradient(126deg, #9c27b0 16%, #d05ce3 84%);\n' +
              '  grid-area: widget-5;\n' +
              '}',
            selector: '.widget-5',
          },
        ],
      ],
    ]),
  );
});
