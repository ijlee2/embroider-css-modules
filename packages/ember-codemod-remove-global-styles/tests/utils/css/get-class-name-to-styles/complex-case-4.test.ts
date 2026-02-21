import { assert, normalizeFile } from '@codemod-utils/tests';

import { getClassNameToStyles } from '../../../../src/utils/css/index.js';
import { testOnPosix } from '../../../helpers/index.js';

testOnPosix(
  'utils | css | get-class-name-to-styles > complex case (4)',
  function () {
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
      getClassNameToStyles(file),
      new Map([
        [
          'container',
          [
            {
              classNames: ['container', 'is-wide', 'no-feedback'],
              code: normalizeFile([
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
              ]),
              line: 1,
              selector: '.container:not(.is-wide, .no-feedback)',
            },
            {
              classNames: ['container', 'is-inline', 'is-wide', 'no-feedback'],
              code: normalizeFile([
                `.container.is-inline:not(.is-wide, .no-feedback) {`,
                `  column-gap: 1rem;`,
                `  grid-template-areas:`,
                `    "field label"`,
                `    "feedback feedback";`,
                `  grid-template-columns: auto 1fr;`,
                `  grid-template-rows: 1fr auto;`,
                `  row-gap: 0.5rem;`,
                `}`,
              ]),
              line: 12,
              selector: '.container.is-inline:not(.is-wide, .no-feedback)',
            },
          ],
        ],
      ]),
    );
  },
);
