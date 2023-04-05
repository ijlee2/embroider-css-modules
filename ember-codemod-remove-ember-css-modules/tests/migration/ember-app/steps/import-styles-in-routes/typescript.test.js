import { importStylesInRoutes } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/typescript.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-app | steps | import-styles-in-routes > typescript', function () {
  const inputProject = convertFixtureToJson(
    'steps/import-styles-in-routes/typescript/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/import-styles-in-routes/typescript/output'
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInRoutes(context, options);

  assertFixture(outputProject, codemodOptions);
});
