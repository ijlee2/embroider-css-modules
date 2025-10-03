import SomeComponentWithArguments from 'test-app-for-embroider-css-modules/components/some-component-with-arguments';

import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module(
  'Integration | Component | some-component-with-arguments',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(<template>
      <SomeComponentWithArguments />
      </template>);

      assert.ok(true);
    });
  },
);
