import styles from './widget-2.module.css';
import { hash } from '@ember/helper';
import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ContainerQuery, height } from 'ember-container-query';
import { revenues } from 'my-v1-app/data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
  type Data,
  type Summary,
} from 'my-v1-app/utils/components/widgets/widget-2';

import WidgetsWidget2Captions from './widget-2/captions';
import WidgetsWidget2StackedChart from './widget-2/stacked-chart';

interface WidgetsWidget2Signature {
  Args: {};
}

export default class WidgetsWidget2 extends Component<WidgetsWidget2Signature> {
  @tracked data = [] as Data[];
  @tracked summaries = [] as Summary[];

  constructor(owner: Owner, args: WidgetsWidget2Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(revenues);
    this.summaries = createSummariesForCaptions(this.data);
  }

  <template><ContainerQuery
  @features={{hash
  short=(height max=240)
  tall=(height max=480 min=240)
  very-tall=(height min=480)
  }}
  @tagName="section"
  class={{styles.components-widgets-widget-2__container}}
  as |CQ|
  >
  <header>
  <h2>Widget 2</h2>
  </header>

  {{#unless CQ.features.short}}
  <div
    class={{styles.components-widgets-widget-2__visualization}}
    data-test-visualization
  >
    <WidgetsWidget2StackedChart @data={{this.data}} />
  </div>
  {{/unless}}

  <div class={{styles.components-widgets-widget-2__captions}} data-test-captions>
  <WidgetsWidget2Captions @summaries={{this.summaries}} />
  </div>
  </ContainerQuery></template>
}
