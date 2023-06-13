import { assert, test } from '@codemod-utils/tests';

import { getCssFilePaths } from '../../../../src/utils/css.js';

test('utils | css | get-css-file-paths > edge case (multiple sources)', function () {
  const options = {
    projectRoot: 'tmp/ember-app-flat',
    src: ['app/components', 'app/controllers'],
  };

  assert.deepStrictEqual(getCssFilePaths(options), [
    'app/components/**/*.css',
    'app/controllers/**/*.css',
  ]);
});
