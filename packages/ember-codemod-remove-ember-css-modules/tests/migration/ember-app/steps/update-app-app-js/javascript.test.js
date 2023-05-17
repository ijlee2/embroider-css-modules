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
} from '../../../../helpers/shared-test-setups/javascript.js';

test('migration | ember-app | steps | update-app-app-js > javascript', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-app-app-js/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-app-app-js/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  updateAppAppJs(options);

  assertFixture(outputProject, codemodOptions);
});
