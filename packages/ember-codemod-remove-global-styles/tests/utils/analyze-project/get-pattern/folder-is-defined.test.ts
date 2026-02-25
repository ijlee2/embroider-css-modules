import { assert, test } from '@codemod-utils/tests';

import {
  getPatternForComponents,
  getPatternForRoutes,
} from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | get-pattern > entity is defined (v1 app)', function () {
  const folder = 'ui/form';

  let output = getPatternForComponents({ folder });

  assert.deepStrictEqual(output, ['app/components/ui/form/**/*.{gjs,gts,hbs}']);

  output = getPatternForRoutes({ folder });

  assert.deepStrictEqual(output, ['app/templates/ui/form/**/*.{gjs,gts,hbs}']);
});
