import { assert, test } from '@codemod-utils/tests';

import { getModuleFilePath } from '../../../src/utils/css/index.js';

test('utils | get-module-file-path > file extension is a match', function () {
  assert.strictEqual(
    getModuleFilePath('app/components/hello.gjs'),
    'app/components/hello.module.css',
  );

  assert.strictEqual(
    getModuleFilePath('app/components/hello.gts'),
    'app/components/hello.module.css',
  );

  assert.strictEqual(
    getModuleFilePath('app/components/hello.hbs'),
    'app/components/hello.module.css',
  );
});
