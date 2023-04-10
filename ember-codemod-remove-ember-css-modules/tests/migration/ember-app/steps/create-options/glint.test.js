import { createOptions } from '../../../../../src/migration/ember-app/steps/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/glint.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-app | steps | create-options > glint', function () {
  const inputProject = {
    'package.json': JSON.stringify(
      {
        name: 'docs-app',
        version: '4.0.0-alpha.5',
        devDependencies: {
          '@glint/core': '^v1.0.0-beta.4',
          'ember-css-modules': '^2.0.1',
          typescript: '^5.0.3',
        },
      },
      null,
      2
    ),
  };

  loadFixture(inputProject, codemodOptions);

  assert.deepEqual(createOptions(codemodOptions), {
    __styles__: 'styles',
    componentStructure: 'flat',
    project: {
      dependencies: new Map([
        ['@glint/core', '^v1.0.0-beta.4'],
        ['ember-css-modules', '^2.0.1'],
        ['typescript', '^5.0.3'],
      ]),
      hasEmberCssModules: true,
      hasGlint: true,
      hasTypeScript: true,
    },
    projectRoot: 'tmp/ember-container-query-glint',
  });
});
