import { assert, test } from '@codemod-utils/tests';

import { traverseCSS } from '../../../helpers/transforms/css.js';

test('utils | ast | css > traverse (file is empty)', function () {
  const oldFile = '';

  const newFile = traverseCSS(oldFile);

  assert.strictEqual(newFile, '');
});
