/*
  Place the test components directly under `app/components`.
*/
import {
  assert,
  assertFixture,
  convertFixtureToJson,
  type DirJSON,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateComponentTemplates } from '../../../../../src/migration/ember-app/steps/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/glint.js';

function getContext(fileName: string) {
  const entityName = fileName.replace(new RegExp(/\.hbs$/), '');
  const extensions = new Set(['.hbs']);

  return {
    components: new Map<string, Set<string>>([[entityName, extensions]]),
    routes: new Map<string, Set<string>>(),
  };
}

test('migration | ember-app | steps | update-component-templates > glint', function () {
  const inputProject = convertFixtureToJson(
    'steps/update-component-templates/glint/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-component-templates/glint/output',
  );

  const fileMap = (inputProject['app'] as DirJSON)['components'] as DirJSON;
  let fileName, file;

  try {
    for ([fileName, file] of Object.entries(fileMap)) {
      const inputProjectLocalized = {
        app: {
          components: {
            [fileName]: file,
          },
        },
      } as unknown as DirJSON;

      const outputProjectLocalized = {
        app: {
          components: {
            [fileName]: (
              (outputProject['app'] as DirJSON)['components'] as DirJSON
            )[fileName],
          },
        },
      } as unknown as DirJSON;

      const contextLocalized = getContext(fileName);

      loadFixture(inputProjectLocalized, codemodOptions);

      updateComponentTemplates(contextLocalized, options);

      assertFixture(outputProjectLocalized, codemodOptions);
    }
  } catch (error) {
    let message = `${fileName} failed.`;

    if (error instanceof Error) {
      message = error.message;
    }

    assert.fail(`${message}\n`);
  }
});
