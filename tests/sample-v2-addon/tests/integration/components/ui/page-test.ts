import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('The component handles the page layout', async function (assert) {
    await render(hbs`
      <Ui::PageNew
        @title="Form"
      >
        <div data-test-body>
        </div>
      </Ui::PageNew>
    `);

    assert.dom('h1').hasText('Form', 'We see the title.');

    assert.dom('[data-test-body]').exists('We see the yielded content.');
  });

  test('CSS modules', async function (assert) {
    await render(hbs`
      <Ui::PageNew
        @title="Form"
      >
        <div data-test-body>
        </div>
      </Ui::PageNew>
    `);

    assert.dom('h1').hasClass(/^sample-v2-addon/, 'We see the local style.');
  });
});
