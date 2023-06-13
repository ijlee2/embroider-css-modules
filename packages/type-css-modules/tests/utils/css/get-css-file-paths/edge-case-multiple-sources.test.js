import { assert, test } from '@codemod-utils/tests';

import { getCssFilePaths } from '../../../../src/utils/css.js';
import { options } from '../../../helpers/shared-test-setups/ember-app-nested.js';

test('utils | css | get-css-file-paths > edge case (multiple sources)', function () {
  assert.deepStrictEqual(getCssFilePaths(options), [
    'app/components/**/*.css',
    'app/controllers/**/*.css',
  ]);
});
