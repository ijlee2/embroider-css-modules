import Component from '@glimmer/component';

import type { Data } from '../../../../utils/components/widgets/widget-2';
import styles from './index.css';

interface WidgetsWidget2StackedChartComponentSignature {
  Args: {
    data: Array<Data>;
  };
}

export default class WidgetsWidget2StackedChartComponent extends Component<WidgetsWidget2StackedChartComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
  }
}
