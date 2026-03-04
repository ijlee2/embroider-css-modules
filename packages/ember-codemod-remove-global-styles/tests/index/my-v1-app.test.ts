import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/my-v1-app/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v1-app.js';

test('index > my-v1-app', async function () {
  loadFixture(inputProject, codemodOptions);

  await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
