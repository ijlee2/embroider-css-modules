import { assert, test } from '@codemod-utils/tests';

import { getModuleFilePath } from '../../../src/utils/css/index.js';

test('utils | get-module-file-path > base case', function () {
  assert.strictEqual(getModuleFilePath(''), '');
  assert.strictEqual(getModuleFilePath('.gjs'), '.gjs');
  assert.strictEqual(getModuleFilePath('.gts'), '.gts');
  assert.strictEqual(getModuleFilePath('.hbs'), '.hbs');
});
