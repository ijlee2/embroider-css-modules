import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from '../../helpers';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/products');

    assert
      .dom('[data-test-product-card]')
      .exists({ count: 33 }, 'We see 33 products.');
  });
});
