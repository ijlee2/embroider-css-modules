import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { local } from 'embroider-css-modules';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-embroider-css-modules/tests/helpers';

interface TestContext extends BaseTestContext {
  styles: Record<string, never>;
}

module('Integration | Helper | local', function (hooks) {
  setupRenderingTest(hooks);

  module('When styles is an empty object', function (nestedHooks) {
    nestedHooks.beforeEach(function (this: TestContext) {
      this.styles = {};
    });

    test('returns an empty string when there are no local class names', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div class={{local self.styles}} data-test-element>
          </div>
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute('class', '', 'We see the correct global class names.');
    });

    test('returns an empty string when there are local class names', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div
            {{! @glint-expect-error: We are testing a special case (styles is an empty object) }}
            class={{local self.styles "container" "is-wide" "is-inline"}}
            data-test-element
          >
          </div>
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute('class', '', 'We see the correct global class names.');
    });
  });
});
