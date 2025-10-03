import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import drawStackedChart from 'my-v1-app/modifiers/draw-stacked-chart';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module('Integration | Modifier | draw-stacked-chart', function (hooks) {
  setupRenderingTest(hooks);

  test('We can draw a chart', async function (this: TestContext, assert) {
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
