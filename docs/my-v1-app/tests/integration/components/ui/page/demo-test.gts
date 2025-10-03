import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import UiPageDemo from 'my-v2-addon/components/ui/page/demo';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../../helpers';

module('Integration | Component | ui/page/demo', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <UiPageDemo>
          Render a demo here.
        </UiPageDemo>
      </template>,
    );

    assert.dom().hasText('Render a demo here.', 'We see the yielded content.');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
