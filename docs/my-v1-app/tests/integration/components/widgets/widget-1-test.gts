import { findAll, render } from '@ember/test-helpers';
import WidgetsWidget1 from 'my-v1-app/components/widgets/widget-1';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | widgets/widget-1', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders', async function (assert) {
    await render(<template><WidgetsWidget1 /></template>);

    const titles = findAll('[data-test-title]');

    assert.strictEqual(titles.length, 3);

    assert.dom(titles[0]).hasText('Item 1');

    assert.dom(titles[1]).hasText('Item 2');

    assert.dom(titles[2]).hasText('Item 3');
  });
});
