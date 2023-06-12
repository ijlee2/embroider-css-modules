/*
  At the moment, the component structure doesn't affect we update
  component templates. For the nested component structure, it is
  sufficient to check that the template files can be read.
*/
import {
  assert,
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateComponentTemplates } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/nested.js';

function getContext(folderName) {
  const entityName = folderName.replace(new RegExp(/\.hbs$/), '');
  const extensions = new Set(['.hbs']);

  return {
    components: new Map([[entityName, extensions]]),
    routes: new Map([]),
  };
}

test('migration | ember-app | steps | update-component-templates > nested', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-component-templates/nested/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-component-templates/nested/output',
  );

  const fileMap = inputProject.app.components;
  let folderName, folder;

  try {
    for ([folderName, folder] of Object.entries(fileMap)) {
      const inputProjectLocalized = {
        app: {
          components: {
            [folderName]: {
              'index.hbs': folder['index.hbs'],
            },
          },
        },
      };

      const outputProjectLocalized = {
        app: {
          components: {
            [folderName]: {
              'index.hbs':
                outputProject.app.components[folderName]['index.hbs'],
            },
          },
        },
      };

      const contextLocalized = getContext(folderName);

      loadFixture(inputProjectLocalized, codemodOptions);

      updateComponentTemplates(contextLocalized, options);

      assertFixture(outputProjectLocalized, codemodOptions);
    }
  } catch (e) {
    assert.fail(`${folderName} failed.\n` + e.message);
  }
});
