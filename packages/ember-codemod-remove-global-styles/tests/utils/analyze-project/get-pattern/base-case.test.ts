import { assert, test } from '@codemod-utils/tests';

import {
  getPatternForComponents,
  getPatternForRoutes,
} from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | get-pattern > base case (v1 app)', function () {
  const folder = '';

  let output = getPatternForComponents({ folder });

  assert.deepStrictEqual(output, ['app/components/**/*.{gjs,gts,hbs}']);

  output = getPatternForRoutes({ folder });

  assert.deepStrictEqual(output, ['app/templates/**/*.{gjs,gts,hbs}']);
});
