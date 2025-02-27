import { visit } from '@ember/test-helpers';
import styles from 'my-v2-app/templates/application.module.css';
import { setupApplicationTest } from 'my-v2-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit index', async function (assert) {
    await visit('/');

    assert.dom('[data-test-hello-container]').hasClass(styles.container);
  });
});
