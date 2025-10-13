import { visit } from '@ember/test-helpers';
import {
  a11yAudit,
  setupApplicationTest,
  takeSnapshot,
} from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | not-found', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/404');

    await a11yAudit();
    await takeSnapshot(assert);

    assert.ok(true);
  });
});
