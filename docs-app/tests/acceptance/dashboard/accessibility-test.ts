import { visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

import { setupApplicationTest } from '../../helpers';

module('Acceptance | dashboard', function (hooks) {
  setupApplicationTest(hooks);

  test('Accessibility audit', async function (assert) {
    await visit('/dashboard');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
