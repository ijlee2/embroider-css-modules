import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/simple-case-4.js';

test('utils | css | print-styles > simple case (4)', function () {
  const styles = classNameToStyles.get('checkbox')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
      `.checkbox {`,
      `  align-items: center;`,
      `  background-color: white;`,
      `  border: 0.125rem solid #ffd54f;`,
      `  cursor: pointer;`,
      `  display: flex;`,
      `  height: 1rem;`,
      `  justify-content: center;`,
      `  position: relative;`,
      `  width: 1rem;`,
      `}`,
      ``,
      `.checkbox:focus {`,
      `  background-color: #ffecb3;`,
      `  outline: 0;`,
      `}`,
      ``,
      `.checkbox:not(:focus) {`,
      `  border-color: transparent;`,
      `}`,
    ]),
  );
});
