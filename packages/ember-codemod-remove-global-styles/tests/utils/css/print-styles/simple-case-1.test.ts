import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/simple-case-1.js';

test('utils | css | print-styles > simple case (1)', function () {
  const styles = classNameToStyles.get('image')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
      `.image {`,
      `  aspect-ratio: 4 / 3;`,
      `  border-radius: 0.75rem;`,
      `  width: 100%;`,
      `}`,
      ``,
      `.image {`,
      `  object-fit: cover;`,
      `}`,
    ]),
  );
});
