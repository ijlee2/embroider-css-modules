import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest, takeSnapshot } from '../../helpers';

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);

  test('Visual regression', async function (assert) {
    await visit('/form');
    await takeSnapshot(assert);

    assert.ok(true);
  });
});
