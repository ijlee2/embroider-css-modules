import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject, updateProject } from '../../../src/steps/index.js';
import { inputProject, outputProject } from '../../fixtures/my-v2-app/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | update-project > my-v2-app', async function () {
  loadFixture(inputProject, codemodOptions);

  const project = await analyzeProject(options);

  await updateProject(project, options);

  assertFixture(outputProject, codemodOptions);
});
