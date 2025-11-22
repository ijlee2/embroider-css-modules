import { assert, test } from '@codemod-utils/tests';

import { getModuleFilePath } from '../../../src/utils/css/index.js';

test('utils | get-module-file-path > file extension is not a match', function () {
  assert.strictEqual(
    getModuleFilePath('app/components/hello.css'),
    'app/components/hello.css',
  );

  assert.strictEqual(
    getModuleFilePath('app/components/hello.js'),
    'app/components/hello.js',
  );

  assert.strictEqual(
    getModuleFilePath('app/components/hello.ts'),
    'app/components/hello.ts',
  );
});
