import { createOptions } from '../../../../../src/migration/ember-app/steps/index.js';
import { codemodOptions } from '../../../../helpers/shared-test-setups/nested.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-app | steps | create-options > nested', function () {
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
    componentStructure: 'nested',
    project: {
      dependencies: new Map([
        ['@glint/core', '^v1.0.0-beta.4'],
        ['ember-css-modules', '^2.0.1'],
        ['typescript', '^5.0.3'],
      ]),
      hasEmberCssModules: true,
      hasGlint: true,
      hasTypeScript: true,
      name: 'docs-app',
      version: '4.0.0-alpha.5',
    },
    projectRoot: 'tmp/ember-container-query-nested',
  });
});