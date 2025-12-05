import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { getModuleFilePath } from '../../../../src/utils/css/index.js';

test('utils | css | get-module-file-path > base case', function () {
  assert.strictEqual(
    getModuleFilePath('hello.gjs'),
    normalize('hello.module.css'),
  );
  assert.strictEqual(
    getModuleFilePath('hello.gts'),
    normalize('hello.module.css'),
  );
  assert.strictEqual(
    getModuleFilePath('hello.hbs'),
    normalize('hello.module.css'),
  );

  assert.strictEqual(
    getModuleFilePath('app/components/hello.gjs'),
    normalize('app/components/hello.module.css'),
  );
  assert.strictEqual(
    getModuleFilePath('app/components/hello.gts'),
    normalize('app/components/hello.module.css'),
  );
  assert.strictEqual(
    getModuleFilePath('app/components/hello.hbs'),
    normalize('app/components/hello.module.css'),
  );

  assert.strictEqual(
    getModuleFilePath('app/templates/hello.gjs'),
    normalize('app/templates/hello.module.css'),
  );
  assert.strictEqual(
    getModuleFilePath('app/templates/hello.gts'),
    normalize('app/templates/hello.module.css'),
  );
  assert.strictEqual(
    getModuleFilePath('app/templates/hello.hbs'),
    normalize('app/controllers/hello.module.css'),
  );
});
