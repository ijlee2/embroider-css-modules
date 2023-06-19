import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from '../../helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="embroider-css-modules"]')
      .hasClass('controllers-index__code', 'We see the correct class name.');
  });
});
