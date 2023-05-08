import { visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

import { setupApplicationTest } from '..//helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('it renders', async function (assert) {
    await visit('/');

    assert.ok(true, 'We visited the index route.');

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

    assert.dom('[data-test-local-class-new-helper]').hasStyle(
      {
        color: 'rgb(255, 0, 255)',
      },
      'We can use the {{local-class-new}} helper from embroider-css-modules-temporary.',
    );

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
