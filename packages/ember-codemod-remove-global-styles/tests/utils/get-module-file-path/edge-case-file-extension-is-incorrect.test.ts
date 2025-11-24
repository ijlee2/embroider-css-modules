import { assert, test } from '@codemod-utils/tests';

import { getModuleFilePath } from '../../../src/utils/css/index.js';

test('utils | get-module-file-path > edge case (file extension is incorrect)', function () {
  const filePaths = [
    'app/components/hello.css',
    'app/components/hello.gts.d.ts',
    'app/components/hello.js',
    'app/components/hello.ts',
    'app/components/hello.xyz.hbs',
  ];

  filePaths.forEach((filePath) => {
    assert.throws(
      () => {
        getModuleFilePath(filePath);
      },
      (error: Error) => {
        return error.message === 'File extension is incorrect.';
      },
    );
  });
});
