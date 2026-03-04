import { normalize } from 'node:path';

import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v1-app/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-app.js';

test('steps | analyze-project > my-v1-app', async function () {
  loadFixture(inputProject, codemodOptions);

  const project = await analyzeProject(options);

  assert.deepStrictEqual(
    Array.from(project.components.keys()),
    [
      'app/components/products/product/card.hbs',
      'app/components/products/product/image.hbs',
      'app/components/ui/form.hbs',
      'app/components/ui/form/checkbox.hbs',
      'app/components/ui/form/field.hbs',
      'app/components/ui/form/information.hbs',
      'app/components/ui/form/input.hbs',
      'app/components/ui/form/number.hbs',
      'app/components/ui/form/textarea.hbs',
      'app/components/widgets/widget-1.hbs',
      'app/components/widgets/widget-1/item.hbs',
      'app/components/widgets/widget-2.hbs',
      'app/components/widgets/widget-2/captions.hbs',
      'app/components/widgets/widget-2/stacked-chart.hbs',
      'app/components/widgets/widget-3.hbs',
      'app/components/widgets/widget-3/tour-schedule.hbs',
      'app/components/widgets/widget-3/tour-schedule/responsive-image.hbs',
      'app/components/widgets/widget-4.hbs',
      'app/components/widgets/widget-4/memo.hbs',
      'app/components/widgets/widget-4/memo/actions.hbs',
      'app/components/widgets/widget-4/memo/body.hbs',
      'app/components/widgets/widget-4/memo/header.hbs',
      'app/components/widgets/widget-5.hbs',
    ].map(normalize),
  );

  assert.deepStrictEqual(
    Array.from(project.routes.keys()),
    [
      'app/templates/application.hbs',
      'app/templates/dashboard.hbs',
      'app/templates/form.hbs',
      'app/templates/index.hbs',
      'app/templates/not-found.hbs',
      'app/templates/products.hbs',
    ].map(normalize),
  );
});
