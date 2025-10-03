import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import WidgetsWidget4 from 'my-v1-app/components/widgets/widget-4';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | widgets/widget-4', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render(<template><WidgetsWidget4 /></template>);

    assert
      .dom('[data-test-link="All memos"]')
      .exists('We see the All memos link.');
  });
});
