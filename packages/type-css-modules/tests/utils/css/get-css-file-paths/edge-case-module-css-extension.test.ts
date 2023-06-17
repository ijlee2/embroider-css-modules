import { assert, test } from '@codemod-utils/tests';

import { getCssFilePaths } from '../../../../src/utils/css.js';
import { options } from '../../../helpers/shared-test-setups/ember-app-module-css-extension.js';

test('utils | css | get-css-file-paths > edge case (.module.css extension)', function () {
  assert.deepStrictEqual(getCssFilePaths(options), ['app/**/*.css']);
});
