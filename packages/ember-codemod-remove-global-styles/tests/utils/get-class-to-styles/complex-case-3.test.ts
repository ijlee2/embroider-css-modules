import { assert, test } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../src/utils/css/index.js';

test('utils | get-class-to-styles > complex case (3)', function () {
  const file = [
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
    `.summary {`,
    `  color: #455a64;`,
    `  display: grid;`,
    `  font-size: 0.875rem;`,
    `  grid-area: summary;`,
    `  grid-template-areas:`,
    `    "music-format"`,
    `    "annual-revenue"`,
    `    "relevant-years";`,
    `  grid-template-columns: 1fr;`,
    `  grid-template-rows: repeat(3, auto);`,
    `  overflow-y: auto;`,
    `}`,
    ``,
    `.music-format {`,
    `  color: rgb(247 252 251 / 90%);`,
    `  display: flex;`,
    `  font-size: 1rem;`,
    `  grid-area: music-format;`,
    `  margin-bottom: 0.5rem;`,
    `  word-break: break-all;`,
    `}`,
    ``,
    `.marker {`,
    `  align-items: center;`,
    `  background-color: rgb(247 252 251 / 90%);`,
    `  border-radius: 0.5rem;`,
    `  display: flex;`,
    `  height: 1em;`,
    `  justify-content: center;`,
    `  margin-right: 0.25rem;`,
    `  padding: 0.125rem;`,
    `  width: 1rem;`,
    `}`,
    ``,
    `.annual-revenue {`,
    `  font-size: 0.8rem;`,
    `  grid-area: annual-revenue;`,
    `}`,
    ``,
    `.relevant-years {`,
    `  font-size: 0.8rem;`,
    `  grid-area: relevant-years;`,
    `}`,
    ``,
    `.highlight {`,
    `  color: rgb(247 252 251 / 90%);`,
    `}`,
    ``,
    `.previous-button,`,
    `.next-button {`,
    `  align-items: center;`,
    `  display: flex;`,
    `  height: 2rem;`,
    `  justify-content: center;`,
    `  margin: 0.25rem;`,
    `}`,
    ``,
    `.previous-button {`,
    `  grid-area: previous-button;`,
    `}`,
    ``,
    `.next-button {`,
    `  grid-area: next-button;`,
    `}`,
    ``,
    `.icon {`,
    `  color: rgb(247 252 251 / 90%);`,
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
    `.container.flat .annual-revenue,`,
    `.container.flat .relevant-years {`,
    `  display: flex;`,
    `  flex-direction: column;`,
    `}`,
    ``,
    `.container.flat .previous-button,`,
    `.container.flat .next-button {`,
    `  background: linear-gradient(36deg, #7cb342 16%, #4b830d 84%);`,
    `  border: 0;`,
    `}`,
    ``,
    `.music-format.small-font-size {`,
    `  font-size: 0.875rem;`,
    `  margin: 0;`,
    `}`,
    ``,
  ].join('\n');

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'container',
        [
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
        ],
      ],
      [
        'summary',
        [
          {
            classes: ['summary'],
            location: {
              end: { column: 1, line: 27, offset: 535 },
              start: { column: 1, line: 15, offset: 269 },
            },
            raw:
              '.summary {\n' +
              '  color: #455a64;\n' +
              '  display: grid;\n' +
              '  font-size: 0.875rem;\n' +
              '  grid-area: summary;\n' +
              '  grid-template-areas:\n' +
              '    "music-format"\n' +
              '    "annual-revenue"\n' +
              '    "relevant-years";\n' +
              '  grid-template-columns: 1fr;\n' +
              '  grid-template-rows: repeat(3, auto);\n' +
              '  overflow-y: auto;\n' +
              '}',
            selector: '.summary',
          },
        ],
      ],
      [
        'music-format',
        [
          {
            classes: ['music-format'],
            location: {
              end: { column: 1, line: 36, offset: 700 },
              start: { column: 1, line: 29, offset: 537 },
            },
            raw:
              '.music-format {\n' +
              '  color: rgb(247 252 251 / 90%);\n' +
              '  display: flex;\n' +
              '  font-size: 1rem;\n' +
              '  grid-area: music-format;\n' +
              '  margin-bottom: 0.5rem;\n' +
              '  word-break: break-all;\n' +
              '}',
            selector: '.music-format',
          },
          {
            classes: ['music-format', 'small-font-size'],
            location: {
              end: { column: 1, line: 114, offset: 2108 },
              start: { column: 1, line: 111, offset: 2039 },
            },
            raw: '.music-format.small-font-size {\n  font-size: 0.875rem;\n  margin: 0;\n}',
            selector: '.music-format.small-font-size',
          },
        ],
      ],
      [
        'marker',
        [
          {
            classes: ['marker'],
            location: {
              end: { column: 1, line: 48, offset: 925 },
              start: { column: 1, line: 38, offset: 702 },
            },
            raw:
              '.marker {\n' +
              '  align-items: center;\n' +
              '  background-color: rgb(247 252 251 / 90%);\n' +
              '  border-radius: 0.5rem;\n' +
              '  display: flex;\n' +
              '  height: 1em;\n' +
              '  justify-content: center;\n' +
              '  margin-right: 0.25rem;\n' +
              '  padding: 0.125rem;\n' +
              '  width: 1rem;\n' +
              '}',
            selector: '.marker',
          },
        ],
      ],
      [
        'annual-revenue',
        [
          {
            classes: ['annual-revenue'],
            location: {
              end: { column: 1, line: 53, offset: 996 },
              start: { column: 1, line: 50, offset: 927 },
            },
            raw: '.annual-revenue {\n  font-size: 0.8rem;\n  grid-area: annual-revenue;\n}',
            selector: '.annual-revenue',
          },
        ],
      ],
      [
        'relevant-years',
        [
          {
            classes: ['relevant-years'],
            location: {
              end: { column: 1, line: 58, offset: 1067 },
              start: { column: 1, line: 55, offset: 998 },
            },
            raw: '.relevant-years {\n  font-size: 0.8rem;\n  grid-area: relevant-years;\n}',
            selector: '.relevant-years',
          },
        ],
      ],
      [
        'highlight',
        [
          {
            classes: ['highlight'],
            location: {
              end: { column: 1, line: 62, offset: 1116 },
              start: { column: 1, line: 60, offset: 1069 },
            },
            raw: '.highlight {\n  color: rgb(247 252 251 / 90%);\n}',
            selector: '.highlight',
          },
        ],
      ],
      [
        'previous-button',
        [
          {
            classes: ['previous-button'],
            location: {
              end: { column: 1, line: 71, offset: 1254 },
              start: { column: 1, line: 64, offset: 1118 },
            },
            raw:
              '.previous-button {\n' +
              '  align-items: center;\n' +
              '  display: flex;\n' +
              '  height: 2rem;\n' +
              '  justify-content: center;\n' +
              '  margin: 0.25rem;\n' +
              '}',
            selector: '.previous-button',
          },
          {
            classes: ['previous-button'],
            location: {
              end: { column: 1, line: 75, offset: 1306 },
              start: { column: 1, line: 73, offset: 1256 },
            },
            raw: '.previous-button {\n  grid-area: previous-button;\n}',
            selector: '.previous-button',
          },
        ],
      ],
      [
        'next-button',
        [
          {
            classes: ['next-button'],
            location: {
              end: { column: 1, line: 71, offset: 1254 },
              start: { column: 1, line: 64, offset: 1118 },
            },
            raw:
              '.next-button {\n' +
              '  align-items: center;\n' +
              '  display: flex;\n' +
              '  height: 2rem;\n' +
              '  justify-content: center;\n' +
              '  margin: 0.25rem;\n' +
              '}',
            selector: '.next-button',
          },
          {
            classes: ['next-button'],
            location: {
              end: { column: 1, line: 79, offset: 1350 },
              start: { column: 1, line: 77, offset: 1308 },
            },
            raw: '.next-button {\n  grid-area: next-button;\n}',
            selector: '.next-button',
          },
        ],
      ],
      [
        'icon',
        [
          {
            classes: ['icon'],
            location: {
              end: { column: 1, line: 83, offset: 1394 },
              start: { column: 1, line: 81, offset: 1352 },
            },
            raw: '.icon {\n  color: rgb(247 252 251 / 90%);\n}',
            selector: '.icon',
          },
        ],
      ],
    ]),
  );
});
