import { render } from '@ember/test-helpers';
import WidgetsWidget5 from 'docs-app-for-embroider-css-modules/components/widgets/widget-5';
import { setupRenderingTest } from 'docs-app-for-embroider-css-modules/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-5', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><WidgetsWidget5 /></template>);

    assert
      .dom('[data-test-call-to-action]')
      .hasText('What will you create with embroider-css-modules ?');
  });
});
