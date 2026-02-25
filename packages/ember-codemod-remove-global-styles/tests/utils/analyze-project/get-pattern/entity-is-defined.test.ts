import { assert, test } from '@codemod-utils/tests';

import {
  getPatternForComponents,
  getPatternForRoutes,
} from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | get-pattern > entity is defined (v1 app)', function () {
  const entity = 'ui/form';

  let output = getPatternForComponents({ entity });

  assert.deepStrictEqual(output, [
    'app/components/ui/form.{gjs,gts,hbs}',
    'app/components/ui/form/**/*.{gjs,gts,hbs}',
  ]);

  output = getPatternForRoutes({ entity });

  assert.deepStrictEqual(output, [
    'app/templates/ui/form.{gjs,gts,hbs}',
    'app/templates/ui/form/**/*.{gjs,gts,hbs}',
  ]);
});
