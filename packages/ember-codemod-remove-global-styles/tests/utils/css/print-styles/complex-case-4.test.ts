import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/complex-case-4.js';

test('utils | css | print-styles > complex case (4)', function () {
  const styles = classNameToStyles.get('container')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
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
    ]),
  );
});
