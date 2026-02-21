import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { printStyles } from '../../../../src/utils/css/index.js';
import { classNameToStyles } from '../../../helpers/utils/css/complex-case-2.js';

test('utils | css | print-styles > complex case (2)', function () {
  const styles = classNameToStyles.get('link')!;

  const output = printStyles(styles);

  assert.strictEqual(
    output,
    normalizeFile([
      `.link {`,
      `  background: transparent;`,
      `  border: 0.0625rem solid rgb(247 252 251 / 50%);`,
      `  border-radius: 0.15rem;`,
      `  color: rgb(247 252 251 / 90%);`,
      `  font-family: Raleway, sans-serif;`,
      `  font-size: 0.875rem;`,
      `  margin-top: 0.5rem;`,
      `  padding: 0.25rem 0.5rem;`,
      `  text-decoration: none;`,
      `}`,
      ``,
      `.link::after {`,
      `  content: "";`,
      `  height: 100%;`,
      `  left: 0;`,
      `  position: absolute;`,
      `  top: 0;`,
      `  width: 100%;`,
      `}`,
      ``,
      `.link:focus {`,
      `  outline: 0;`,
      `}`,
      ``,
      `.link:focus::after {`,
      `  border: 1px solid orange;`,
      `}`,
    ]),
  );
});
