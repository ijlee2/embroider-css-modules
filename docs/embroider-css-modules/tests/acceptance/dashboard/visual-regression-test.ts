import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { percySnapshot, setupApplicationTest } from '../../helpers';

module('Acceptance | dashboard', function (hooks) {
  setupApplicationTest(hooks);

  test('Visual regression', async function (assert) {
    assert.expect(1);

    await visit('/dashboard');
    await percySnapshot(assert);

    assert.ok(true);
  });
});
