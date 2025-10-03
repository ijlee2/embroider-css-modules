import { local } from 'embroider-css-modules';

import {
  render,
  resetOnerror,
  setupOnerror,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../helpers';

interface TestContext extends BaseTestContext {
  styles: undefined;
}

module('Integration | Helper | local', function (hooks) {
  setupRenderingTest(hooks);

  module('When styles is undefined', function (nestedHooks) {
    nestedHooks.beforeEach(function (this: TestContext) {
      this.styles = undefined;
    });

    test('throws an error when there are no local class names (only in development environment)', async function (this: TestContext, assert) {
      setupOnerror(function () {
        // Do nothing
      });

      const self = this;




      await render(<template>
      <div
      {{! @glint-expect-error: We are testing a special case (styles has an incorrect type) }}
      class={{local self.styles}}
      data-test-element
      >
      </div>
      </template>);

      assert.throws(function () {
        throw new Error('The styles object is undefined.');
      }, 'We see the correct error message.');

      resetOnerror();
    });

    test('throws an error when there are local class names (only in development environment)', async function (this: TestContext, assert) {
      setupOnerror(function () {
        // Do nothing
      });

      const self = this;




      await render(<template>
      <div
      {{! @glint-expect-error: We are testing a special case (styles has an incorrect type) }}
      class={{local self.styles "container" "is-wide" "is-inline"}}
      data-test-element
      >
      </div>
      </template>);

      assert.throws(function () {
        throw new Error('The styles object is undefined.');
      }, 'We see the correct error message.');

      resetOnerror();
    });
  });
});
