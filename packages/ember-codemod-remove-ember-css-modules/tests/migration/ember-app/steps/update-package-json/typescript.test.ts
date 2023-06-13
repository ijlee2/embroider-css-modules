import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updatePackageJson } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';

test('migration | ember-app | steps | update-package-json > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-package-json/typescript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-package-json/typescript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updatePackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
