import { parseEntityName } from '../../../../src/utils/string.js';
import { assert, test } from '../../../helpers/testing.js';

test('utils | string | entity-name | parseEntityName', function () {
  assert.deepStrictEqual(parseEntityName(''), {
    classifiedName: '',
    doubleColonizedName: '',
    fileName: '',
    name: '',
  });

  assert.deepStrictEqual(parseEntityName('tracks'), {
    classifiedName: 'Tracks',
    doubleColonizedName: 'Tracks',
    fileName: 'tracks',
    name: 'tracks',
  });

  assert.deepStrictEqual(parseEntityName('navigation-menu'), {
    classifiedName: 'NavigationMenu',
    doubleColonizedName: 'NavigationMenu',
    fileName: 'navigation-menu',
    name: 'navigation-menu',
  });

  assert.deepStrictEqual(parseEntityName('ui/page'), {
    classifiedName: 'UiPage',
    doubleColonizedName: 'Ui::Page',
    fileName: 'page',
    name: 'ui/page',
  });

  assert.deepStrictEqual(
    parseEntityName('widgets/widget-3/tour-schedule/responsive-image'),
    {
      classifiedName: 'WidgetsWidget3TourScheduleResponsiveImage',
      doubleColonizedName: 'Widgets::Widget3::TourSchedule::ResponsiveImage',
      fileName: 'responsive-image',
      name: 'widgets/widget-3/tour-schedule/responsive-image',
    },
  );
});
