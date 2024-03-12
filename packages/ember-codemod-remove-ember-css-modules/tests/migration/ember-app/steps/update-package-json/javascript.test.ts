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
} from '../../../../helpers/shared-test-setups/ember-app/javascript.js';

test('migration | ember-app | steps | update-package-json > javascript', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/update-package-json/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/update-package-json/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updatePackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
