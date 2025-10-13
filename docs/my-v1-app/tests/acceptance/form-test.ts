import { visit } from '@ember/test-helpers';
import {
  a11yAudit,
  setupApplicationTest,
  takeSnapshot,
} from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | form', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/form');

    assert.dom('[data-test-form="Contact me"]').exists();

    assert.dom('[data-test-field]').exists({ count: 5 });

    assert.dom('[data-test-button="Submit"]').hasText('Submit');

    await a11yAudit();
    await takeSnapshot(assert);
  });
});
