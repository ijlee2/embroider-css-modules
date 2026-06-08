import { render } from '@ember/test-helpers';
import drawStackedChart from 'docs-app-for-embroider-css-modules/modifiers/draw-stacked-chart';
import { setupRenderingTest } from 'docs-app-for-embroider-css-modules/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Modifier | draw-stacked-chart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
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
