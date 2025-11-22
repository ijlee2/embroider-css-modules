import { assert, test } from '@codemod-utils/tests';

import { getModuleFilePath } from '../../../src/utils/css/index.js';

test('utils | get-module-file-path > edge case', function () {
  assert.strictEqual(
    getModuleFilePath('app/components/hello.gts.d.ts'),
    'app/components/hello.gts.d.ts',
  );

  assert.strictEqual(
    getModuleFilePath('app/components/hello.xyz.hbs'),
    'app/components/hello.xyz.module.css',
  );
});
