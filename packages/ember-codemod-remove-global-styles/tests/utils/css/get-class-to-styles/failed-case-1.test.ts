import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix('utils | css | get-class-to-styles > failed case (1)', function () {
  const file = normalizeFile([
    `.container:not(.is-wide, .no-feedback) {`,
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
    `.container.is-inline:not(.is-wide, .no-feedback) {`,
    `  column-gap: 1rem;`,
    `  grid-template-areas:`,
    `    "field label"`,
    `    "feedback feedback";`,
    `  grid-template-columns: auto 1fr;`,
    `  grid-template-rows: 1fr auto;`,
    `  row-gap: 0.5rem;`,
    `}`,
    ``,
  ]);

  assert.deepStrictEqual(
    getClassToStyles(file),
    new Map([
      [
        'container',
        [
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
        ],
      ],
      [
        'no-feedback',
        [
          {
            classes: ['no-feedback'],
            location: {
              end: { column: 1, line: 10, offset: 208 },
              start: { column: 1, line: 1, offset: 0 },
            },
            raw: normalizeFile([
              `.no-feedback) {`,
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
            selector: '.no-feedback)',
          },
          {
            classes: ['no-feedback'],
            location: {
              end: { column: 1, line: 20, offset: 434 },
              start: { column: 1, line: 12, offset: 210 },
            },
            raw: normalizeFile([
              `.no-feedback) {`,
              `  column-gap: 1rem;`,
              `  grid-template-areas:`,
              `    "field label"`,
              `    "feedback feedback";`,
              `  grid-template-columns: auto 1fr;`,
              `  grid-template-rows: 1fr auto;`,
              `  row-gap: 0.5rem;`,
              `}`,
            ]),
            selector: '.no-feedback)',
          },
        ],
      ],
    ]),
  );
});
