import { render } from '@ember/test-helpers';
import WidgetsWidget4 from 'my-v1-app/components/widgets/widget-4';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-4', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template><WidgetsWidget4 /></template>);

    assert.dom('[data-test-link="All memos"]').exists();
  });
});
