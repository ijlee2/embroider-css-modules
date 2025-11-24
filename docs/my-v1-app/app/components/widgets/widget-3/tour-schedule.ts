import templateOnlyComponent from '@ember/component/template-only';
import type { Concert } from 'my-v1-app/data/concert';

interface WidgetsWidget3TourScheduleSignature {
  Args: {
    concert: Concert;
  };
}

const WidgetsWidget3TourSchedule =
  templateOnlyComponent<WidgetsWidget3TourScheduleSignature>();

export default WidgetsWidget3TourSchedule;
