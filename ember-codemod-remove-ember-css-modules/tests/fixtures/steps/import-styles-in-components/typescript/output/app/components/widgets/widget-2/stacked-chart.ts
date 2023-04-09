import Component from '@glimmer/component';

import type { Data } from '../../../utils/components/widgets/widget-2';

import styles from './stacked-chart.css';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

const WidgetsWidget2StackedChartComponent =
  class extends Component {};

export default WidgetsWidget2StackedChartComponent;
