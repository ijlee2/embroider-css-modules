import { render } from '@ember/test-helpers';
import WidgetsWidget2 from 'docs-app-for-embroider-css-modules/components/widgets/widget-2';
import { setupRenderingTest } from 'docs-app-for-embroider-css-modules/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-2', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template><WidgetsWidget2 /></template>);

    assert.dom('[data-test-visualization]').exists();

    assert.dom('[data-test-captions]').exists();
  });
});
