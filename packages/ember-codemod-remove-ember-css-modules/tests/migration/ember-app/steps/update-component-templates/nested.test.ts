/*
  At the moment, the component structure doesn't affect we update
  component templates. For the nested component structure, it is
  sufficient to check that the template files can be read.
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
} from '../../../../helpers/shared-test-setups/ember-app/nested.js';

function getContext(folderName: string) {
  const entityName = folderName.replace(new RegExp(/\.hbs$/), '');
  const extensions = new Set(['.hbs']);

  return {
    components: new Map<string, Set<string>>([[entityName, extensions]]),
    routes: new Map<string, Set<string>>(),
  };
}

test('migration | ember-app | steps | update-component-templates > nested', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/update-component-templates/nested/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/update-component-templates/nested/output',
  );

  const fileMap = (inputProject['app'] as DirJSON)['components'] as DirJSON;
  let folderName, folder;

  try {
    for ([folderName, folder] of Object.entries(fileMap)) {
      const inputProjectLocalized = {
        app: {
          components: {
            [folderName]: {
              'index.hbs': (folder as DirJSON)['index.hbs'],
            },
          },
        },
      } as unknown as DirJSON;

      const outputProjectLocalized = {
        app: {
          components: {
            [folderName]: {
              'index.hbs': (
                ((outputProject['app'] as DirJSON)['components'] as DirJSON)[
                  folderName
                ] as DirJSON
              )['index.hbs'],
            },
          },
        },
      } as unknown as DirJSON;

      const contextLocalized = getContext(folderName);

      loadFixture(inputProjectLocalized, codemodOptions);

      updateComponentTemplates(contextLocalized, options);

      assertFixture(outputProjectLocalized, codemodOptions);
    }
  } catch {
    assert.fail(`${folderName} failed.\n`);
  }
});
