import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/simple-case-2.js';

test('utils | css | print-styles > simple case (2)', function () {
  const styles = classNameToStyles.get('link')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
      `.link {`,
      `  display: inline-block;`,
      `  font-size: 0.875rem;`,
      `  padding: 0.875rem 1rem;`,
      `  text-decoration: none;`,
      `  white-space: nowrap;`,
      `}`,
      ``,
      `.link:global(\\.active) {`,
      `  background-color: #15202d;`,
      `}`,
      ``,
      `.link:hover {`,
      `  background-color: #26313d;`,
      `  transition: background-color 0.17s;`,
      `}`,
    ]),
  );
});
