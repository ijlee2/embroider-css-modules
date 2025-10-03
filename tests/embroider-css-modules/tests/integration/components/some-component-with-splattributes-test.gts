import SomeComponentWithSplattributes from 'test-app-for-embroider-css-modules/components/some-component-with-splattributes';

import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../helpers';

module(
  'Integration | Component | some-component-with-splattributes',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it renders', async function (assert) {
      await render(<template>
      <SomeComponentWithSplattributes />
      </template>);

      assert.ok(true);
    });
  },
);
