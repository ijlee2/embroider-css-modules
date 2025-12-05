import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { traverseCSS } from '../../../helpers/transforms/css.js';

test('utils | ast | css > traverse (base case)', function () {
  const oldFile = normalizeFile([
    '.application {}',
    '.header {}',
    '.main {}',
    '.footer {}',
    '.copyright {}',
    '.copyright .link {}',
    '',
  ]);

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
