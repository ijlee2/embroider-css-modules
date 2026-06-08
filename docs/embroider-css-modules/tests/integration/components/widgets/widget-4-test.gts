import { render } from '@ember/test-helpers';
import WidgetsWidget4 from 'docs-app-for-embroider-css-modules/components/widgets/widget-4';
import { setupRenderingTest } from 'docs-app-for-embroider-css-modules/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-4', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><WidgetsWidget4 /></template>);

    assert.dom('[data-test-link="All memos"]').exists();
  });
});
