import { normalize } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | analyze-project > my-v2-app', async function () {
  loadFixture(inputProject, codemodOptions);

  const project = await analyzeProject(options);

  assert.deepStrictEqual(
    Array.from(project.components.keys()),
    [
      'app/components/products/product/card.gts',
      'app/components/products/product/image.gts',
      'app/components/ui/form.gts',
      'app/components/ui/form/checkbox.gts',
      'app/components/ui/form/field.gts',
      'app/components/ui/form/information.gts',
      'app/components/ui/form/input.gts',
      'app/components/ui/form/number.gts',
      'app/components/ui/form/textarea.gts',
      'app/components/widgets/widget-1.gts',
      'app/components/widgets/widget-1/item.gjs',
      'app/components/widgets/widget-2.gts',
      'app/components/widgets/widget-2/captions.gts',
      'app/components/widgets/widget-2/stacked-chart.gts',
      'app/components/widgets/widget-3.gts',
      'app/components/widgets/widget-3/tour-schedule.gjs',
      'app/components/widgets/widget-3/tour-schedule/responsive-image.gjs',
      'app/components/widgets/widget-4.gjs',
      'app/components/widgets/widget-4/memo.gts',
      'app/components/widgets/widget-4/memo/actions.gts',
      'app/components/widgets/widget-4/memo/body.gts',
      'app/components/widgets/widget-4/memo/header.gts',
      'app/components/widgets/widget-5.gts',
    ].map(normalize),
  );

  assert.deepStrictEqual(
    Array.from(project.routes.keys()),
    [
      'app/templates/application.gts',
      'app/templates/dashboard.gjs',
      'app/templates/form.gts',
      'app/templates/index.gjs',
      'app/templates/not-found.gts',
      'app/templates/products.gts',
    ].map(normalize),
  );
});
