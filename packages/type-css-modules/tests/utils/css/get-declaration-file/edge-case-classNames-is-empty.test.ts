import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { getDeclarationFile } from '../../../../src/utils/css.js';

test('utils | css | get-declaration-file > edge case (classNames is empty)', function () {
  const classNames: string[] = [];

  assert.deepStrictEqual(
    getDeclarationFile(classNames),
    normalizeFile([
      'declare const styles: Record<string, never>;',
      '',
      'export default styles;',
      '',
    ]),
  );
});
