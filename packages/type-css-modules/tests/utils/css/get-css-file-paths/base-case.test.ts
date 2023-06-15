import { assert, test } from '@codemod-utils/tests';

import { getCssFilePaths } from '../../../../src/utils/css.js';
import { options } from '../../../helpers/shared-test-setups/ember-app-flat.js';

test('utils | css | get-css-file-paths > base case', function () {
  assert.deepStrictEqual(getCssFilePaths(options), ['app/**/*.css']);
});
