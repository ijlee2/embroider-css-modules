import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | widgets/widget-5', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render(<template>
    <Widgets::Widget-5 />
    </template>);

    assert
      .dom('[data-test-call-to-action]')
      .hasText(
        'What will you create with embroider-css-modules ?',
        'We see the correct text for call-to-action.',
      );
  });
});
