import { assert, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { codemodOptions } from '../../helpers/shared-test-setups/ember-app-nested.js';

test('steps | create-options > ember-app-nested', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), {
    projectRoot: 'tmp/ember-app-nested',
    src: ['app/components', 'app/controllers'],
  });
});
