import { module, test } from 'qunit';

import { setupTest } from '../../helpers';

module('Unit | Controller | dashboard', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    const controller = this.owner.lookup('controller:dashboard');
    assert.ok(controller);
  });
});
