/* eslint-disable qunit/require-expect */
import { visit } from '@ember/test-helpers';
import percySnapshot from '@percy/ember';
import { module, test } from 'qunit';

import { setupApplicationTest } from '../../helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('Visual snapshot', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-link="embroider-css-modules"]')
      .hasClass('controllers-index-module__code');

    await percySnapshot(assert);
  });
});
