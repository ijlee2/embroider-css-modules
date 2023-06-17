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
} from '../../helpers/shared-test-setups/ember-app-module-css-extension.js';

test('steps | clean-declaration-files > ember-app-module-css-extension', function () {
  const inputProject = convertFixtureToJson(
    'steps/clean-declaration-files/ember-app-module-css-extension/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/clean-declaration-files/ember-app-module-css-extension/output',
  );

  loadFixture(inputProject, codemodOptions);

  cleanDeclarationFiles(options);

  assertFixture(outputProject, codemodOptions);
});
