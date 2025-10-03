import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | widgets/widget-2', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (this: TestContext, assert) {
    await render(<template>
    <Widgets::Widget-2 />
    </template>);

    assert.dom('[data-test-visualization]').exists('We see the visualization.');

    assert.dom('[data-test-captions]').exists('We see the captions.');
  });
});
