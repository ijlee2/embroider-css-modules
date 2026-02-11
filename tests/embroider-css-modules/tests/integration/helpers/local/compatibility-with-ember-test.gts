import { array } from '@ember/helper';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { local } from 'embroider-css-modules';
import { module, test } from 'qunit';
import SomeComponentWithArguments from 'test-app-for-embroider-css-modules/components/some-component-with-arguments';
import SomeComponentWithSplattributes from 'test-app-for-embroider-css-modules/components/some-component-with-splattributes';
import { setupRenderingTest } from 'test-app-for-embroider-css-modules/tests/helpers';

interface TestContext extends BaseTestContext {
  arguments?: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  styles: {
    container: string;
    'is-inline': string;
    'is-wide': string;
    'no-feedback': string;
  };
}

module('Integration | Helper | local', function (hooks) {
  setupRenderingTest(hooks);

  module('Compatibility with Ember', function (nestedHooks) {
    nestedHooks.beforeEach(function (this: TestContext) {
      this.styles = {
        container: 'container-hashed',
        'is-inline': 'is-inline-hashed',
        'is-wide': 'is-wide-hashed',
        'no-feedback': 'no-feedback-hashed',
      };
    });

    test('{{array}} helper', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div
            class={{local
              self.styles
              "container"
              (if true (array "is-wide" "is-inline") "no-feedback")
            }}
            data-test-element
          >
          </div>
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-wide-hashed is-inline-hashed',
          'We see the correct global class names.',
        );
    });

    test('component arguments', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <SomeComponentWithArguments
            @classNames={{local self.styles "container" "is-wide" "is-inline"}}
          />
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-wide-hashed is-inline-hashed',
          'We see the correct global class names.',
        );
    });

    test('globally scoped classes', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          {{! prettier-ignore }}
          <div
      class="p-4 {{local self.styles 'container' 'is-wide' 'is-inline'}} my-2"
      data-test-element
      >
      </div>
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'p-4 container-hashed is-wide-hashed is-inline-hashed my-2',
          'We see the correct global class names.',
        );
    });

    test('{{if}} and {{unless}} helpers', async function (this: TestContext, assert) {
      this.arguments = {
        errorMessage: undefined,
        isInline: true,
        isWide: undefined,
      };

      const self = this;

      await render(
        <template>
          <div
            class={{local
              self.styles
              "container"
              (if self.arguments.isWide "is-wide")
              (if self.arguments.isInline "is-inline")
              (unless self.arguments.errorMessage "no-feedback")
            }}
            data-test-element
          >
          </div>
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-inline-hashed no-feedback-hashed',
          'We see the correct global class names.',
        );
    });

    test('splattributes', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <SomeComponentWithSplattributes
            class={{local self.styles "container" "is-wide" "is-inline"}}
          />
        </template>,
      );

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-wide-hashed is-inline-hashed',
          'We see the correct global class names.',
        );
    });
  });
});
