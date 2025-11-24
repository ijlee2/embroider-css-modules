import templateOnlyComponent from '@ember/component/template-only';
import type { Data } from 'my-v1-app/utils/components/widgets/widget-2';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

const WidgetsWidget2StackedChart =
  templateOnlyComponent<WidgetsWidget2StackedChartSignature>();

export default WidgetsWidget2StackedChart;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChart;
    'widgets/widget-2:/stacked-chart': typeof WidgetsWidget2StackedChart;
  }
}
