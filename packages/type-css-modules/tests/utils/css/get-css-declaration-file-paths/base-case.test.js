import { assert, test } from '@codemod-utils/tests';

import { getCssDeclarationFilePaths } from '../../../../src/utils/css.js';
import { options } from '../../../helpers/shared-test-setups/ember-app-flat.js';

test('utils | css | get-css-declaration-file-paths > base case', function () {
  assert.deepStrictEqual(getCssDeclarationFilePaths(options), [
    'app/**/*.css.d.ts',
  ]);
});
