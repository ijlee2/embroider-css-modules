import { createOptions } from '../../../../../src/migration/ember-app/steps/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/javascript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-app | steps | create-options > javascript', function () {
  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'docs-app',
        version: '4.0.0-alpha.5',
        devDependencies: {
          'ember-css-modules': '^2.0.1',
        },
      },
      null,
      2,
    ),
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(createOptions(codemodOptions), {
    __styles__: 'styles',
    componentStructure: 'flat',
    project: {
      dependencies: new Map([['ember-css-modules', '^2.0.1']]),
      hasEmberCssModules: true,
      hasGlint: false,
      hasTypeScript: false,
    },
    projectRoot: 'tmp/ember-container-query-javascript',
  });
});
