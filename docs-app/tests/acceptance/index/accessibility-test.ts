import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('Accessibility audit', async function (assert) {
    await visit('/');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
