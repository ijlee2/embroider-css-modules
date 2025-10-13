import { render } from '@ember/test-helpers';
import WidgetsWidget3 from 'my-v1-app/components/widgets/widget-3';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-3', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template><WidgetsWidget3 /></template>);

    assert.dom('[data-test-tour-schedule]').exists();
  });
});
