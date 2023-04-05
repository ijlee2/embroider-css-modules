import { TestContext as BaseTestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

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

module('Integration | Helper | local-class', function (hooks) {
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

    test('component arguments', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <SomeComponentWithArguments
          @classNames={{local-class
            this.styles
            "container"
            "is-wide"
            "is-inline"
          }}
        />
      `);

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-wide-hashed is-inline-hashed',
          'We see the correct global class names.'
        );
    });

    test('globally scoped classes', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div
          class="p-4 {{local-class this.styles 'container' 'is-wide' 'is-inline'}} my-2"
          data-test-element
        >
        </div>
      `);

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'p-4 container-hashed is-wide-hashed is-inline-hashed my-2',
          'We see the correct global class names.'
        );
    });

    test('{{if}} and {{unless}} helpers', async function (this: TestContext, assert) {
      this.arguments = {
        errorMessage: undefined,
        isInline: true,
        isWide: undefined,
      };

      await render<TestContext>(hbs`
        <div
          class={{local-class
            this.styles
            "container"
            (if this.arguments.isWide "is-wide")
            (if this.arguments.isInline "is-inline")
            (unless this.arguments.errorMessage "no-feedback")
          }}
          data-test-element
        >
        </div>
      `);

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-inline-hashed no-feedback-hashed',
          'We see the correct global class names.'
        );
    });

    test('splattributes', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <SomeComponentWithSplattributes
          class={{local-class
            this.styles
            'container'
            'is-wide'
            'is-inline'
          }}
        />
      `);

      assert
        .dom('[data-test-element]')
        .hasAttribute(
          'class',
          'container-hashed is-wide-hashed is-inline-hashed',
          'We see the correct global class names.'
        );
    });
  });
});
