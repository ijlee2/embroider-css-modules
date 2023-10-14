import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest, takeSnapshot } from '../../helpers';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  test('Visual regression', async function (assert) {
    await visit('/products');
    await takeSnapshot(assert);

    assert.ok(true);
  });
});
