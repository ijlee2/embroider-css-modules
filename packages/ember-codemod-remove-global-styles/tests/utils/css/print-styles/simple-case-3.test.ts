import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/simple-case-3.js';

test('utils | css | print-styles > simple case (3)', function () {
  const styles = classNameToStyles.get('input')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
      `.input {`,
      `  border: 0.125rem solid #ffd54f;`,
      `  padding: 0.125rem 0.25rem;`,
      `  width: calc(100% - 0.75rem);`,
      `}`,
      ``,
      `.input:focus {`,
      `  background-color: #ffecb3;`,
      `  outline: 0;`,
      `}`,
      ``,
      `.input:not(:focus) {`,
      `  border-color: transparent;`,
      `}`,
      ``,
      `.input::placeholder {`,
      `  font-style: italic;`,
      `}`,
    ]),
  );
});
