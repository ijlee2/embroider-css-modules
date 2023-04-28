import { getCssDeclarationFilePaths } from '../../../src/utils/css.js';
import { options } from '../../helpers/shared-test-setups/ember-app-flat.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | css | get-css-declaration-file-paths', function () {
  assert.deepStrictEqual(getCssDeclarationFilePaths(options), [
    'app/**/*.css.d.ts',
  ]);
});
