import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../../helpers';

module('Integration | Component | ui/page/demo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::Page::Demo>
        Render a demo here.
      </Ui::Page::Demo>
    `);

    assert.dom().hasText('Render a demo here.', 'We see the yielded content.');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
