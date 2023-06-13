import { assert, test } from '@codemod-utils/tests';

import { traverseCSS } from '../../../helpers/transforms/css.js';

test('utils | ast | css > traverse (base case)', function () {
  const oldFile = [
    '.application {}',
    '.header {}',
    '.main {}',
    '.footer {}',
    '.copyright {}',
    '.copyright .link {}',
    '',
  ].join('\n');

  const newFile = traverseCSS(oldFile);

  assert.strictEqual(
    newFile,
    [
      '.application{}',
      '.header{}',
      '.main{}',
      '.footer{}',
      '.copyright{}',
      '.copyright .link{}',
      '',
    ].join(''),
  );
});
