import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/complex-case-3.js';

test('utils | css | print-styles > complex case (3)', function () {
  const styles = classNameToStyles.get('container')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
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
    ]),
  );
});
