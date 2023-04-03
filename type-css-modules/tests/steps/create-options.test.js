import { createOptions } from '../../src/steps/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/ember-app-flat.js';
import { assert, test } from '../helpers/testing.js';

test('steps | create-options', function () {
  assert.deepStrictEqual(createOptions(codemodOptions), {
    projectRoot: 'tmp/ember-app-flat',
    src: ['app'],
  });
});
