import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { classNameToStyles } from '../../../helpers/utils/css/complex-case-4.js';

test('utils | css | get-class-name-to-styles > complex case (4)', function () {
  assert.deepStrictEqual(Array.from(classNameToStyles.keys()), ['container']);

  const styles = classNameToStyles.get('container');

  assert.deepStrictEqual(styles, [
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
  ]);
});
