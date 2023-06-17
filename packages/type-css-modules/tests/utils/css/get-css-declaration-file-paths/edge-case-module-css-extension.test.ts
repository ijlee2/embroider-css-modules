import { assert, test } from '@codemod-utils/tests';

import { getCssDeclarationFilePaths } from '../../../../src/utils/css.js';
import { options } from '../../../helpers/shared-test-setups/ember-app-module-css-extension.js';

test('utils | css | get-css-declaration-file-paths > edge case (.module.css extension)', function () {
  assert.deepStrictEqual(getCssDeclarationFilePaths(options), [
    'app/**/*.css.d.ts',
  ]);
});
