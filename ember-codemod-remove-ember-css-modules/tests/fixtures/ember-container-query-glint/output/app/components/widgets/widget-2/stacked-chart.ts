import templateOnlyComponent from '@ember/component/template-only';

import type { Data } from '../../../utils/components/widgets/widget-2';

import styles from './stacked-chart.css';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

const WidgetsWidget2StackedChartComponent =
  templateOnlyComponent<WidgetsWidget2StackedChartSignature>();

export default WidgetsWidget2StackedChartComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
  }
}
