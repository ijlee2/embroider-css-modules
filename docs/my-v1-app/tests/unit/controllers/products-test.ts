import { setupTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Controller | products', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:products');

    assert.ok(controller);
  });
});
