import templateOnlyComponent from '@ember/component/template-only';

import type { Data } from '../../../utils/components/widgets/widget-2';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

const WidgetsWidget2StackedChartComponent =
  templateOnlyComponent<WidgetsWidget2StackedChartSignature>();

export default WidgetsWidget2StackedChartComponent;
