import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { cleanDeclarationFiles } from '../../../src/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/ember-app-flat.js';

test('steps | clean-declaration-files > ember-app-flat', function () {
  const inputProject = convertFixtureToJson(
    'steps/clean-declaration-files/ember-app-flat/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/clean-declaration-files/ember-app-flat/output',
  );

  loadFixture(inputProject, codemodOptions);

  cleanDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
