import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest, takeSnapshot } from '../../helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('Visual regression', async function (assert) {
    await visit('/');
    await takeSnapshot(assert);

    assert.ok(true);
  });
});
