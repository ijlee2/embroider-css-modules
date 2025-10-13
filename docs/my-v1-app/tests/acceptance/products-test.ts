import { visit } from '@ember/test-helpers';
import {
  a11yAudit,
  setupApplicationTest,
  takeSnapshot,
} from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/products');

    assert.dom('[data-test-product-card]').exists({ count: 33 });

    await a11yAudit();
    await takeSnapshot(assert);
  });
});
