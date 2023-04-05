import { importStylesInComponents } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

test('migration | ember-app | steps | import-styles-in-components > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/import-styles-in-components/glint/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/import-styles-in-components/glint/output'
  );

  loadFixture(inputProject, codemodOptions);

  importStylesInComponents(context, options);

  assertFixture(outputProject, codemodOptions);
});
