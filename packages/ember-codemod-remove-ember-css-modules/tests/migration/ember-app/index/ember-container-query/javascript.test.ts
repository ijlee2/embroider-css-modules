import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberApp } from '../../../../../src/migration/ember-app/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/ember-app/ember-container-query-javascript/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/ember-app/javascript.js';

test('migration | ember-app | index | ember-container-query > javascript', function () {
  loadFixture(inputProject, codemodOptions);

  migrateEmberApp(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  migrateEmberApp(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
