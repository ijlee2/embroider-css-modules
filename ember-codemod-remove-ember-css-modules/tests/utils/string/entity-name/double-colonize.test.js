import { doubleColonizeEntityName } from '../../../../src/utils/string.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | string | entity-name | double-doubleColonizeEntityName', function () {
  assert.strictEqual(doubleColonizeEntityName(''), '');

  assert.strictEqual(doubleColonizeEntityName('tracks'), 'Tracks');

  assert.strictEqual(
    doubleColonizeEntityName('navigation-menu'),
    'NavigationMenu'
  );

  assert.strictEqual(doubleColonizeEntityName('ui/page'), 'Ui::Page');

  assert.strictEqual(
    doubleColonizeEntityName('widgets/widget-3/tour-schedule/responsive-image'),
    'Widgets::Widget3::TourSchedule::ResponsiveImage'
  );
});
