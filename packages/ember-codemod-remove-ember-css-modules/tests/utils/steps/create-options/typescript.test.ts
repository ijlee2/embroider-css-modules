import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../../src/utils/steps/create-options.js';
import { codemodOptions } from '../../../helpers/shared-test-setups/ember-app/typescript.js';

test('utils | steps | create-options > typescript', function () {
  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'docs-app',
        version: '4.0.0-alpha.5',
        devDependencies: {
          'ember-css-modules': '^2.0.1',
          typescript: '^5.0.3',
        },
      },
      null,
      2,
    ),
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), {
    componentStructure: 'flat',
    project: {
      dependencies: new Map([
        ['ember-css-modules', '^2.0.1'],
        ['typescript', '^5.0.3'],
      ]),
      hasEmberCssModules: true,
      hasGlint: false,
      hasTypeScript: true,
    },
    projectRoot: 'tmp/ember-app/ember-container-query-typescript',
    projectType: 'app',
  });
});
