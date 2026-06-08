import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app-for-embroider-css-modules/tests/helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
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
