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
} from '../../../../helpers/shared-test-setups/ember-app/nested.js';

test('migration | ember-app | steps | update-package-json > nested', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/update-package-json/nested/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/update-package-json/nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  updatePackageJson(options);

  assertFixture(outputProject, codemodOptions);
});
