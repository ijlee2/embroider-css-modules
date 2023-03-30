import Component from '@glimmer/component';

import type { Concert } from '../../../../data/concert';
import styles from './index.css';

interface WidgetsWidget3TourScheduleComponentSignature {
  Args: {
    concert: Concert;
  };
}

export default class WidgetsWidget3TourScheduleComponent extends Component<WidgetsWidget3TourScheduleComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule': typeof WidgetsWidget3TourScheduleComponent;
  }
}
