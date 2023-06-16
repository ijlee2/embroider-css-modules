import { assert, test } from '@codemod-utils/tests';

import { getDeclarationFile } from '../../../../src/utils/css.js';

test('utils | css | get-declaration-file > edge case (classNames has 1 element)', function () {
  const classNames = ['container'];

  assert.deepStrictEqual(
    getDeclarationFile(classNames),
    [
      'declare const styles: {',
      "  readonly 'container': string;",
      '};',
      '',
      'export default styles;',
      '',
    ].join('\n'),
  );
});
