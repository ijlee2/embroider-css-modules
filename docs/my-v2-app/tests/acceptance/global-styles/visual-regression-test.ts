import { visit } from '@ember/test-helpers';
import { setupApplicationTest, takeSnapshot } from 'my-v2-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | global-styles', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit global-styles', async function (assert) {
    await visit('/global-styles');
    await takeSnapshot(assert);

    assert.dom('[data-test-container]').hasStyle({
      'font-size': '128px',
    });
  });
});
