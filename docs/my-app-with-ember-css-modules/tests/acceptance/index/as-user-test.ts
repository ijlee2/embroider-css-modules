import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from '../../helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/');

    assert.dom('[data-test-local-class-attribute]').hasStyle(
      {
        color: 'rgb(255, 140, 0)',
      },
      'We can use the local-class attribute from ember-css-modules.',
    );

    assert.dom('[data-test-local-class-helper]').hasStyle(
      {
        color: 'rgb(255, 140, 0)',
      },
      'We can use the {{local-class}} helper from ember-css-modules.',
    );

    assert.dom('[data-test-local-helper]').hasStyle(
      {
        color: 'rgb(255, 0, 255)',
      },
      'We can use the {{local}} helper from embroider-css-modules-temporary.',
    );
  });
});
