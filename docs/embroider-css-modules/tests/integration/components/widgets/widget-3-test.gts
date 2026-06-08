import { render } from '@ember/test-helpers';
import WidgetsWidget3 from 'docs-app-for-embroider-css-modules/components/widgets/widget-3';
import { setupRenderingTest } from 'docs-app-for-embroider-css-modules/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-3', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><WidgetsWidget3 /></template>);

    assert.dom('[data-test-tour-schedule]').exists();
  });
});
