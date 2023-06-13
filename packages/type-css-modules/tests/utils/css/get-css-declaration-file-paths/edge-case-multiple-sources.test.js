import { assert, test } from '@codemod-utils/tests';

import { getCssDeclarationFilePaths } from '../../../../src/utils/css.js';
import { options } from '../../../helpers/shared-test-setups/ember-app-nested.js';

test('utils | css | get-css-declaration-file-paths > edge case (multiple sources)', function () {
  assert.deepStrictEqual(getCssDeclarationFilePaths(options), [
    'app/components/**/*.css.d.ts',
    'app/controllers/**/*.css.d.ts',
  ]);
});
