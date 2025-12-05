import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';

test('utils | css | print-styles > failed case (1)', function () {
  const styles = [
    {
      classes: ['container', 'is-wide'],
      location: {
        end: { column: 1, line: 10, offset: 208 },
        start: { column: 1, line: 1, offset: 0 },
      },
      raw: normalizeFile([
        `.container:not(.is-wide {`,
        `  column-gap: 0;`,
        `  grid-template-areas:`,
        `    "label"`,
        `    "field"`,
        `    "feedback";`,
        `  grid-template-columns: 1fr;`,
        `  grid-template-rows: auto 1fr auto;`,
        `  row-gap: 0.5rem;`,
        `}`,
      ]),
      selector: '.container:not(.is-wide',
    },
    {
      classes: ['container', 'is-inline', 'is-wide'],
      location: {
        end: { column: 1, line: 20, offset: 434 },
        start: { column: 1, line: 12, offset: 210 },
      },
      raw: normalizeFile([
        `.container.is-inline:not(.is-wide {`,
        `  column-gap: 1rem;`,
        `  grid-template-areas:`,
        `    "field label"`,
        `    "feedback feedback";`,
        `  grid-template-columns: auto 1fr;`,
        `  grid-template-rows: 1fr auto;`,
        `  row-gap: 0.5rem;`,
        `}`,
      ]),
      selector: '.container.is-inline:not(.is-wide',
    },
  ];

  assert.strictEqual(
    printStyles(styles),
    normalizeFile([
      `.container:not(.is-wide {`,
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
      `.container.is-inline:not(.is-wide {`,
      `  column-gap: 1rem;`,
      `  grid-template-areas:`,
      `    "field label"`,
      `    "feedback feedback";`,
      `  grid-template-columns: auto 1fr;`,
      `  grid-template-rows: 1fr auto;`,
      `  row-gap: 0.5rem;`,
      `}`,
    ]),
  );
});
