/*
  Place the test components directly under `app/components`.
*/
import { updateComponentTemplates } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';
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
    components: new Map([[entityName, extensions]]),
    routes: new Map([]),
  };
}

test('migration | ember-app | steps | update-component-templates > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-component-templates/glint/input'
  );

  const outputProject = convertFixtureToJson(
    'steps/update-component-templates/glint/output'
  );

  const fileMapping = inputProject.app.components;
  let fileName, file;

  try {
    for ([fileName, file] of Object.entries(fileMapping)) {
      const inputProjectLocalized = {
        app: {
          components: {
            [fileName]: file,
          },
        },
      };

      const outputProjectLocalized = {
        app: {
          components: {
            [fileName]: outputProject.app.components[fileName],
          },
        },
      };

      const contextLocalized = getContext(fileName);

      loadFixture(inputProjectLocalized, codemodOptions);

      updateComponentTemplates(contextLocalized, options);

      assertFixture(outputProjectLocalized, codemodOptions);
    }
  } catch (e) {
    assert.fail(`${fileName} failed.\n` + e.message);
  }
}).only();
