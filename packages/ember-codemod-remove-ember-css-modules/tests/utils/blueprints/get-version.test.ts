import { assert, test } from '@codemod-utils/tests';

import { getVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/glint.js';

test('utils | blueprints | get-version', function () {
  const version = getVersion('webpack', options);

  assert.strictEqual(version, '^5.77.0');
});
