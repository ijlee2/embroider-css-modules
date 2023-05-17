import { getVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/glint.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | blueprints | get-version', function () {
  const version = getVersion('webpack', options);

  assert.strictEqual(version, '^5.77.0');
});
