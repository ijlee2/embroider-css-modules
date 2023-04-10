import { createDeclarationFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';
import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../helpers/testing.js';

test('steps | create-declaration-files > ember-app-flat', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-flat/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-flat/output'
  );

  loadFixture(inputProject, codemodOptions);

  createDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
