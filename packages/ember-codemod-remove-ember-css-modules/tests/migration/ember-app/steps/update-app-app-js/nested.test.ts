import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateAppAppJs } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/nested.js';

test('migration | ember-app | steps | update-app-app-js > nested', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/update-app-app-js/nested/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/update-app-app-js/nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAppAppJs(options);

  assertFixture(outputProject, codemodOptions);
});
