import { visit } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupApplicationTest } from '../../helpers';

module('Acceptance | dashboard', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/dashboard');

    // Widget 1
    assert.dom('[data-test-widget="1"]').exists('We see the first widget.');

    // Widget 2
    assert
      .dom('[data-test-widget="2"] [data-test-visualization]')
      .exists('We see the visualization.');

    assert
      .dom('[data-test-widget="2"] [data-test-captions]')
      .exists('We see the captions.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Music Format"]')
      .hasText('8 - Track', 'We see the music format in correct format.');

    assert
      .dom('[data-test-widget="2"] [data-test-field="Annual Revenue"]')
      .hasText(
        'Annual revenue: $2.3 billion',
        'We see the annual revenue in correct format.',
      );

    assert
      .dom('[data-test-widget="2"] [data-test-field="Relevant Years"]')
      .hasText(
        'Relevant years: 1973 - 1982',
        'We see the relevant years in correct format.',
      );

    assert
      .dom('[data-test-widget="2"] [data-test-button="Previous"]')
      .doesNotExist("We don't see the previous button.");

    assert
      .dom('[data-test-widget="2"] [data-test-button="Next"]')
      .hasText(
        'A chevron arrow pointing right',
        'We see the next button in correct format.',
      );

    // Widget 3
    assert
      .dom('[data-test-widget="3"] [data-test-link="All tours"]')
      .exists('We see the All tours link.');

    assert
      .dom('[data-test-widget="3"] [data-test-image="Concert"]')
      .hasAttribute(
        'src',
        new RegExp('^/images/widgets/widget-3/.+\\.jpg$'),
        'We see the concert image.',
      );

    // Widget 4
    assert
      .dom('[data-test-widget="4"] [data-test-link="All memos"]')
      .exists('We see the All memos link.');

    assert
      .dom('[data-test-widget="4"] [data-test-memo-header]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo header doesn't use the minimal layout.",
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-body]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo body doesn't use the minimal layout.",
      );

    assert
      .dom('[data-test-widget="4"] [data-test-memo-actions]')
      .doesNotHaveClass(
        /minimal-layout/,
        "The memo actions doesn't use the minimal layout.",
      );

    // Widget 5
    assert
      .dom('[data-test-widget="5"] [data-test-call-to-action]')
      .hasText(
        'What will you create with embroider-css-modules ?',
        'We see the correct call to action.',
      );
  });
});
