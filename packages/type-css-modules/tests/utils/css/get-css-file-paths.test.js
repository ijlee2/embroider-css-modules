import { getCssFilePaths } from '../../../src/utils/css.js';
import { options } from '../../helpers/shared-test-setups/ember-app-flat.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | css | get-css-file-paths', function () {
  assert.deepStrictEqual(getCssFilePaths(options), ['app/**/*.css']);
});
