import { assert, loadFixture, test } from '@codemod-utils/tests';

import { getClassNames } from '../../../../src/utils/css.js';
import {
  codemodOptions,
  options,
} from '../../../helpers/shared-test-setups/ember-app-flat.js';

test('utils | css | get-class-names > edge case (pseudo class :local)', function () {
  const cssFile = ':local(.link).active {}';

  const inputProject = {
    app: {
      'styles.css': cssFile,
    },
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(getClassNames('app/styles.css', options), ['active']);
});
