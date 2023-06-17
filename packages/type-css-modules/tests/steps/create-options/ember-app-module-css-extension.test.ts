import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { codemodOptions } from '../../helpers/shared-test-setups/ember-app-module-css-extension.js';

test('steps | create-options > ember-app-module-css-extension', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), {
    projectRoot: 'tmp/ember-app-module-css-extension',
    src: ['app'],
  });
});
