import { cleanDeclarationFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-nested.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../helpers/testing.js';

test('steps | clean-declaration-files > ember-app-nested', function () {
  const inputProject = convertFixtureToJson(
    'steps/clean-declaration-files/ember-app-nested/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/clean-declaration-files/ember-app-nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  cleanDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
