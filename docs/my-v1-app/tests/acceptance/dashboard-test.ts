import { visit } from '@ember/test-helpers';
import {
  a11yAudit,
  setupApplicationTest,
  takeSnapshot,
} from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | dashboard', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/dashboard');

    // Widget 1
    assert.dom('[data-test-widget="1"]').exists();

    // Widget 2
    assert.dom('[data-test-widget="2"] [data-test-visualization]').exists();

    assert.dom('[data-test-widget="2"] [data-test-captions]').exists();

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText('Annual revenue: $2.3 billion');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText('Relevant years: 1973 - 1982');

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist();

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText('A chevron arrow pointing right');

    // Widget 3
    assert.dom('[data-test-widget="3"] [data-test-link="All tours"]').exists();

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute('src', new RegExp('^/images/widgets/widget-3/.+\\.jpg$'));

    // Widget 4
    assert.dom('[data-test-widget="4"] [data-test-link="All memos"]').exists();

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .doesNotHaveClass(/minimal-layout/);

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .doesNotHaveClass(/minimal-layout/);

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .doesNotHaveClass(/minimal-layout/);

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText('What will you create with embroider-css-modules ?');

    await a11yAudit();
    await takeSnapshot(assert);
  });
});
