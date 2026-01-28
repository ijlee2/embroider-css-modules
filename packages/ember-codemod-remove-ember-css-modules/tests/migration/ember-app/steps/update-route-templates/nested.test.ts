/*
  At the moment, we update component and route templates in the same way.
  Please check the input and output for `update-component-templates`.
*/
import {
  assert,
  assertFixture,
  convertFixtureToJson,
  type DirJSON,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateRouteTemplates } from '../../../../../src/migration/ember-app/steps/index.js';
import type { Context } from '../../../../../src/types/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/ember-app/nested.js';

function getContext(fileName: string): Context {
  const entityName = fileName.replace(new RegExp(/\.hbs$/), '');
  const extensions = new Set(['.hbs']);

  return {
    components: new Map<string, Set<string>>(),
    routes: new Map<string, Set<string>>([[entityName, extensions]]),
  };
}

test('migration | ember-app | steps | update-route-templates > nested', function () {
  const inputProject = convertFixtureToJson(
    'ember-app/steps/update-route-templates/nested/input',
  );

  const outputProject = convertFixtureToJson(
    'ember-app/steps/update-route-templates/nested/output',
  );

  const fileMap = (inputProject['app'] as DirJSON)['templates'] as DirJSON;
  let fileName, file;

  try {
    for ([fileName, file] of Object.entries(fileMap)) {
      const inputProjectLocalized = {
        app: {
          templates: {
            [fileName]: file,
          },
        },
      } as unknown as DirJSON;

      const outputProjectLocalized = {
        app: {
          templates: {
            [fileName]: (
              (outputProject['app'] as DirJSON)['templates'] as DirJSON
            )[fileName],
          },
        },
      } as unknown as DirJSON;

      const contextLocalized = getContext(fileName);

      loadFixture(inputProjectLocalized, codemodOptions);

      updateRouteTemplates(contextLocalized, options);

      assertFixture(outputProjectLocalized, codemodOptions);
    }
  } catch {
    assert.fail(`${fileName} failed.\n`);
  }
});
