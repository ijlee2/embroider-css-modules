import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { codemodOptions } from '../../helpers/shared-test-setups/ember-app-flat.js';

test('steps | create-options > ember-app-flat', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), {
    projectRoot: 'tmp/ember-app-flat',
    src: ['app'],
  });
});
