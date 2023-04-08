/*
  At the moment, we update component and route templates in the same way.
  Please check the input and output for `update-component-templates`.
*/
import { updateRouteTemplates } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/nested.js';
import {
  assert,
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '../../../../helpers/testing.js';

function getContext(fileName) {
  const entityName = fileName.replace(new RegExp(/\.hbs$/), '');
  const extensions = new Set(['.hbs']);

  return {
    components: new Map([]),
    routes: new Map([[entityName, extensions]]),
  };
}

test('migration | ember-app | steps | update-route-templates > nested', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-route-templates/nested/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-route-templates/nested/output'
  );

  const fileMapping = inputProject.app.templates;
  let fileName, file;

  try {
    for ([fileName, file] of Object.entries(fileMapping)) {
      const inputProjectLocalized = {
        app: {
          templates: {
            [fileName]: file,
          },
        },
      };

      const outputProjectLocalized = {
        app: {
          templates: {
            [fileName]: outputProject.app.templates[fileName],
          },
        },
      };

      const contextLocalized = getContext(fileName);

      loadFixture(inputProjectLocalized, codemodOptions);

      updateRouteTemplates(contextLocalized, options);

      assertFixture(outputProjectLocalized, codemodOptions);
    }
  } catch (e) {
    assert.fail(`${fileName} failed.\n` + e.message);
  }
});
