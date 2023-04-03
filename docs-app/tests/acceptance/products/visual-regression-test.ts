/* eslint-disable qunit/require-expect */
import { visit } from '@ember/test-helpers';
import percySnapshot from '@percy/ember';
import { setupApplicationTest } from 'docs-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  test('Visual snapshot', async function (assert) {
    await visit('/products');

    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');

    await percySnapshot(assert);
  });
});
