import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from '../../helpers';

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/form');

    assert
      .dom('[data-test-form="Contact me"]')
      .exists('We see the contact form.');

    assert.dom('[data-test-field]').exists({ count: 4 }, 'We see 4 fields.');

    assert
      .dom('[data-test-button="Submit"]')
      .hasText('Submit', 'We see the submit button.');
  });
});
