import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { a11yAudit, setupApplicationTest } from '../../helpers';

module('Acceptance | not-found', function (hooks) {
  setupApplicationTest(hooks);

  test('Accessibility', async function (assert) {
    await visit('/404');
    await a11yAudit();

    assert.ok(true);
  });
});
