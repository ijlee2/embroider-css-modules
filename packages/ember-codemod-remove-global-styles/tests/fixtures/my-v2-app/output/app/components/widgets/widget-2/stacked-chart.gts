import styles from './stacked-chart.module.css';
import type { TOC } from '@ember/component/template-only';
import drawStackedChart from 'my-v1-app/modifiers/draw-stacked-chart';
import type { Data } from 'my-v1-app/utils/components/widgets/widget-2';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  };
}

const WidgetsWidget2StackedChart: TOC<WidgetsWidget2StackedChartSignature> = <template>
    <div
      class={{styles.components-widgets-widget-2-stacked-chart__svg-container}}
      {{drawStackedChart data=@data}}
    >
      <svg class={{styles.components-widgets-widget-2-stacked-chart__svg}}>
      </svg>
    </div>
  </template>;

export default WidgetsWidget2StackedChart;
