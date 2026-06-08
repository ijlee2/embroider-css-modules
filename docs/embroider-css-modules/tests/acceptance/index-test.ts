import { visit } from '@ember/test-helpers';
import {
  a11yAudit,
  setupApplicationTest,
  takeSnapshot,
} from 'docs-app-for-embroider-css-modules/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/');

    await a11yAudit();
    await takeSnapshot(assert);

    assert.ok(true);
  });
});
