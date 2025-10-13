import { render } from '@ember/test-helpers';
import WidgetsWidget5 from 'my-v1-app/components/widgets/widget-5';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-5', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template><WidgetsWidget5 /></template>);

    assert
      .dom('[data-test-call-to-action]')
      .hasText('What will you create with embroider-css-modules ?');
  });
});
