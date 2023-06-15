import { assert, test } from '@codemod-utils/tests';

import { getDeclarationFile } from '../../../../src/utils/css.js';

test('utils | css | get-declaration-file > base case', function () {
  const classNames = ['copyright', 'has-error', 'link', 'list'];

  assert.deepStrictEqual(
    getDeclarationFile(classNames),
    [
      'declare const styles: {',
      "  readonly 'copyright': string;",
      "  readonly 'has-error': string;",
      "  readonly 'link': string;",
      "  readonly 'list': string;",
      '};',
      '',
      'export default styles;',
      '',
    ].join('\n'),
  );
});
