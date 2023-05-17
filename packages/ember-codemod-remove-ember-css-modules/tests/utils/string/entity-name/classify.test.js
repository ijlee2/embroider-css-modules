import { assert, test } from '@codemod-utils/tests';

import { classifyEntityName } from '../../../../src/utils/string.js';

test('utils | string | entity-name | classifyEntityName', function () {
  assert.strictEqual(classifyEntityName(''), '');

  assert.strictEqual(classifyEntityName('tracks'), 'Tracks');

  assert.strictEqual(classifyEntityName('navigation-menu'), 'NavigationMenu');

  assert.strictEqual(classifyEntityName('ui/page'), 'UiPage');

  assert.strictEqual(
    classifyEntityName('widgets/widget-3/tour-schedule/responsive-image'),
    'WidgetsWidget3TourScheduleResponsiveImage',
  );
});
