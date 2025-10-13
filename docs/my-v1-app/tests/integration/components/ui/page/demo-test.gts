import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import UiPageDemo from 'my-v2-addon/components/ui/page/demo';
import { module, test } from 'qunit';

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

    assert.dom().hasText('Render a demo here.');

    await a11yAudit();
  });
});
