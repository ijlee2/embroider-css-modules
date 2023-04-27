import { createDeclarationFiles } from '../../../src/steps/index.js';
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

test('steps | create-declaration-files > ember-app-nested', function () {
  const inputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-nested/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-declaration-files/ember-app-nested/output',
  );

  loadFixture(inputProject, codemodOptions);

  createDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
