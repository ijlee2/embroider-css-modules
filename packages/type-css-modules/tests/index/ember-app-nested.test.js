import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { typeCssModules } from '../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../fixtures/ember-app-nested/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/ember-app-nested.js';

test('index > ember-app-nested', function () {
  loadFixture(inputProject, codemodOptions);

  typeCssModules(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  typeCssModules(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
