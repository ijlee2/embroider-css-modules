import { render } from '@ember/test-helpers';
import drawStackedChart from 'my-v1-app/modifiers/draw-stacked-chart';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Modifier | draw-stacked-chart', function (hooks) {
  setupRenderingTest(hooks);

  test('We can draw a chart', async function (assert) {
    await render(
      <template>
        <div {{drawStackedChart}}>
          <svg></svg>
        </div>
      </template>,
    );

    assert.ok(true);
  });
});
