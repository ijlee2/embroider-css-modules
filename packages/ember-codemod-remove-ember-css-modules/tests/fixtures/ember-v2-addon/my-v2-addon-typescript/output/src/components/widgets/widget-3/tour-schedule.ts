import Component from '@glimmer/component';

import type { Concert } from '../../../data/concert';

import styles from './tour-schedule.css';

interface WidgetsWidget3TourScheduleSignature {
  Args: {
    concert: Concert;
  };
}

const WidgetsWidget3TourScheduleComponent =
  class extends Component<WidgetsWidget3TourScheduleSignature> {
    styles = styles;
  };

export default WidgetsWidget3TourScheduleComponent;
