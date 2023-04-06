import templateOnlyComponent from '@ember/component/template-only';

import type { Concert } from '../../../data/concert';

import styles from './tour-schedule.css';

interface WidgetsWidget3TourScheduleSignature {
  Args: {
    concert: Concert;
  };
}

const WidgetsWidget3TourScheduleComponent =
  templateOnlyComponent<WidgetsWidget3TourScheduleSignature>();

export default WidgetsWidget3TourScheduleComponent;
