import { decideVersion } from '../../../src/utils/blueprints.js';
import { options } from '../../helpers/shared-test-setups/glint.js';
import { assert, test } from '../../helpers/testing.js';

test('utils | blueprints | decide-version > package is already installed', function () {
  const version = decideVersion('webpack', options);

  assert.strictEqual(version, '^5.77.0');
});

test('utils | blueprints | decide-version > package is not installed and we provide the latest version', function () {
  const version = decideVersion('embroider-css-modules', options);

  assert.strictEqual(version, '^0.1.0');
});

test('utils | blueprints | decide-version > package is not installed and we forgot to provide the latest version', function () {
  assert.throws(
    () => {
      decideVersion('some-package-not-part-of-blueprint', options);
    },
    (error) => {
      assert.strictEqual(
        error.message,
        'ERROR: The latest version of `some-package-not-part-of-blueprint` is unknown.\n'
      );

      return true;
    }
  );
});
