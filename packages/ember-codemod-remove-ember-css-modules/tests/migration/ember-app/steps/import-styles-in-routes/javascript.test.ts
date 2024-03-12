import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { importStylesInRoutes } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/javascript.js';

test('migration | ember-app | steps | import-styles-in-routes > javascript', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-routes/javascript/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/import-styles-in-routes/javascript/output',
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInRoutes(context, options);

  assertFixture(outputProject, codemodOptions);
});
