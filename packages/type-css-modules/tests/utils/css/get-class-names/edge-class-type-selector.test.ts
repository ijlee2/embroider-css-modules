import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/ember-app-flat.js';

test('utils | css | get-class-names > edge case (type selector)', function () {
  const cssFile = normalizeFile([
    '* {}',
    'input {}',
    'input.has-error {}',
    '#ember123 {}',
  ]);

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), [
    'has-error',
  ]);
});
