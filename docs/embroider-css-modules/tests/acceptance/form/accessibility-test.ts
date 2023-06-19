import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { a11yAudit, setupApplicationTest } from '../../helpers';

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);

  test('Accessibility', async function (assert) {
    await visit('/form');
    await a11yAudit();

    assert.ok(true);
  });
});
