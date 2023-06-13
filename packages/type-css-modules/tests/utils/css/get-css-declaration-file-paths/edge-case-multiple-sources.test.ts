import { assert, test } from '@codemod-utils/tests';

import { getCssDeclarationFilePaths } from '../../../../src/utils/css.js';

test('utils | css | get-css-declaration-file-paths > edge case (multiple sources)', function () {
  const options = {
    projectRoot: 'tmp/ember-app-flat',
    src: ['app/components', 'app/controllers'],
  };

  assert.deepStrictEqual(getCssDeclarationFilePaths(options), [
    'app/components/**/*.css.d.ts',
    'app/controllers/**/*.css.d.ts',
  ]);
});
