import { assert, test } from '@codemod-utils/tests';

import { getModuleFilePath } from '../../../src/utils/css/index.js';

test('utils | get-module-file-path > base case', function () {
  assert.strictEqual(getModuleFilePath('hello.gjs'), 'hello.module.css');
  assert.strictEqual(getModuleFilePath('hello.gts'), 'hello.module.css');
  assert.strictEqual(getModuleFilePath('hello.hbs'), 'hello.module.css');

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

  assert.strictEqual(
    getModuleFilePath('app/templates/hello.gjs'),
    'app/templates/hello.module.css',
  );
  assert.strictEqual(
    getModuleFilePath('app/templates/hello.gts'),
    'app/templates/hello.module.css',
  );
  assert.strictEqual(
    getModuleFilePath('app/templates/hello.hbs'),
    'app/controllers/hello.module.css',
  );
});
