import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import WidgetsWidget3 from 'my-v1-app/components/widgets/widget-3';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | widgets/widget-3', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render(<template><WidgetsWidget3 /></template>);

    assert.dom('[data-test-tour-schedule]').exists('We see the tour schedule.');
  });
});
