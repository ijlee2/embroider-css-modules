import { visit } from '@ember/test-helpers';
import {
  a11yAudit,
  setupApplicationTest,
  takeSnapshot,
} from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="embroider-css-modules"]')
      .hasClass('templates-index__code');

    await a11yAudit();
    await takeSnapshot(assert);
  });
});
