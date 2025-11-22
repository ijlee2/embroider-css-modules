import { assert, test } from '@codemod-utils/tests';

import { printStyles } from '../../../src/utils/css/index.js';

test('utils | print-styles > complex case (1)', function () {
  const styles = [
    {
      classes: ['container'],
      location: {
        end: { column: 1, line: 4, offset: 53 },
        start: { column: 1, line: 1, offset: 0 },
      },
      raw: '.container {\n  align-items: start;\n  display: grid;\n}',
      selector: '.container',
    },
    {
      classes: ['container', 'is-wide', 'no-feedback'],
      location: {
        end: { column: 1, line: 15, offset: 267 },
        start: { column: 1, line: 6, offset: 55 },
      },
      raw:
        '.container:not(.is-wide):not(.no-feedback) {\n' +
        '  column-gap: 0;\n' +
        '  grid-template-areas:\n' +
        '    "label"\n' +
        '    "field"\n' +
        '    "feedback";\n' +
        '  grid-template-columns: 1fr;\n' +
        '  grid-template-rows: auto 1fr auto;\n' +
        '  row-gap: 0.5rem;\n' +
        '}',
      selector: '.container:not(.is-wide):not(.no-feedback)',
    },
    {
      classes: ['container', 'is-wide', 'no-feedback'],
      location: {
        end: { column: 1, line: 25, offset: 455 },
        start: { column: 1, line: 17, offset: 269 },
      },
      raw:
        '.container:not(.is-wide).no-feedback {\n' +
        '  column-gap: 0;\n' +
        '  grid-template-areas:\n' +
        '    "label"\n' +
        '    "field";\n' +
        '  grid-template-columns: 1fr;\n' +
        '  grid-template-rows: auto 1fr;\n' +
        '  row-gap: 0.5rem;\n' +
        '}',
      selector: '.container:not(.is-wide).no-feedback',
    },
    {
      classes: ['container', 'is-wide', 'no-feedback'],
      location: {
        end: { column: 1, line: 35, offset: 667 },
        start: { column: 1, line: 27, offset: 457 },
      },
      raw:
        '.container.is-wide:not(.no-feedback) {\n' +
        '  column-gap: 1rem;\n' +
        '  grid-template-areas:\n' +
        '    "label field"\n' +
        '    "label feedback";\n' +
        '  grid-template-columns: 10rem 1fr;\n' +
        '  grid-template-rows: 1fr auto;\n' +
        '  row-gap: 0.5rem;\n' +
        '}',
      selector: '.container.is-wide:not(.no-feedback)',
    },
    {
      classes: ['container', 'is-wide', 'no-feedback'],
      location: {
        end: { column: 1, line: 43, offset: 843 },
        start: { column: 1, line: 37, offset: 669 },
      },
      raw:
        '.container.is-wide.no-feedback {\n' +
        '  column-gap: 1rem;\n' +
        '  grid-template-areas: "label field";\n' +
        '  grid-template-columns: 10rem 1fr;\n' +
        '  grid-template-rows: 1fr;\n' +
        '  row-gap: 0.5rem;\n' +
        '}',
      selector: '.container.is-wide.no-feedback',
    },
    {
      classes: ['container', 'is-inline', 'is-wide', 'no-feedback'],
      location: {
        end: { column: 1, line: 79, offset: 1390 },
        start: { column: 1, line: 71, offset: 1162 },
      },
      raw:
        '.container.is-inline:not(.is-wide):not(.no-feedback) {\n' +
        '  column-gap: 1rem;\n' +
        '  grid-template-areas:\n' +
        '    "field label"\n' +
        '    "feedback feedback";\n' +
        '  grid-template-columns: auto 1fr;\n' +
        '  grid-template-rows: 1fr auto;\n' +
        '  row-gap: 0.5rem;\n' +
        '}',
      selector: '.container.is-inline:not(.is-wide):not(.no-feedback)',
    },
    {
      classes: ['container', 'is-inline', 'is-wide', 'no-feedback'],
      location: {
        end: { column: 1, line: 87, offset: 1576 },
        start: { column: 1, line: 81, offset: 1392 },
      },
      raw:
        '.container.is-inline:not(.is-wide).no-feedback {\n' +
        '  column-gap: 1rem;\n' +
        '  grid-template-areas: "field label";\n' +
        '  grid-template-columns: auto 1fr;\n' +
        '  grid-template-rows: 1fr;\n' +
        '  row-gap: 0;\n' +
        '}',
      selector: '.container.is-inline:not(.is-wide).no-feedback',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    [
      `.container {`,
      `  align-items: start;`,
      `  display: grid;`,
      `}`,
      ``,
      `.container:not(.is-wide):not(.no-feedback) {`,
      `  column-gap: 0;`,
      `  grid-template-areas:`,
      `    "label"`,
      `    "field"`,
      `    "feedback";`,
      `  grid-template-columns: 1fr;`,
      `  grid-template-rows: auto 1fr auto;`,
      `  row-gap: 0.5rem;`,
      `}`,
      ``,
      `.container:not(.is-wide).no-feedback {`,
      `  column-gap: 0;`,
      `  grid-template-areas:`,
      `    "label"`,
      `    "field";`,
      `  grid-template-columns: 1fr;`,
      `  grid-template-rows: auto 1fr;`,
      `  row-gap: 0.5rem;`,
      `}`,
      ``,
      `.container.is-wide:not(.no-feedback) {`,
      `  column-gap: 1rem;`,
      `  grid-template-areas:`,
      `    "label field"`,
      `    "label feedback";`,
      `  grid-template-columns: 10rem 1fr;`,
      `  grid-template-rows: 1fr auto;`,
      `  row-gap: 0.5rem;`,
      `}`,
      ``,
      `.container.is-wide.no-feedback {`,
      `  column-gap: 1rem;`,
      `  grid-template-areas: "label field";`,
      `  grid-template-columns: 10rem 1fr;`,
      `  grid-template-rows: 1fr;`,
      `  row-gap: 0.5rem;`,
      `}`,
      ``,
      `.container.is-inline:not(.is-wide):not(.no-feedback) {`,
      `  column-gap: 1rem;`,
      `  grid-template-areas:`,
      `    "field label"`,
      `    "feedback feedback";`,
      `  grid-template-columns: auto 1fr;`,
      `  grid-template-rows: 1fr auto;`,
      `  row-gap: 0.5rem;`,
      `}`,
      ``,
      `.container.is-inline:not(.is-wide).no-feedback {`,
      `  column-gap: 1rem;`,
      `  grid-template-areas: "field label";`,
      `  grid-template-columns: auto 1fr;`,
      `  grid-template-rows: 1fr;`,
      `  row-gap: 0;`,
      `}`,
    ].join('\n'),
  );
});
