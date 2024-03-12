import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { migrateEmberV2Addon } from '../../../../../src/migration/ember-v2-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../../fixtures/ember-v2-addon/my-v2-addon-typescript/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/ember-v2-addon/typescript.js';

test('migration | ember-v2-addon | index | my-v2-addon > typescript', function () {
  loadFixture(inputProject, codemodOptions);

  migrateEmberV2Addon(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  migrateEmberV2Addon(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
