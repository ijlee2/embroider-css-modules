import { hash } from '@ember/helper';
import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { ContainerQuery, height } from 'ember-container-query';

import musicRevenue from '../../data/music-revenue';
import type { Data, Summary } from '../../utils/components/widgets/widget-2';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from '../../utils/components/widgets/widget-2';
import styles from './widget-2.css';

interface WidgetsWidget2Signature {
  Args: {};
}

export default class WidgetsWidget2Component extends Component<WidgetsWidget2Signature> {
  @tracked data = [] as Data[];
  @tracked summaries = [] as Summary[];

  styles = styles;

  constructor(owner: Owner, args: WidgetsWidget2Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(musicRevenue);
    this.summaries = createSummariesForCaptions(this.data);
  }

  <template>
    <ContainerQuery
      @features={{hash
        short=(height max=240)
        tall=(height max=480 min=240)
        very-tall=(height min=480)
      }}
      @tagName="section"
      class={{this.styles.container}}
      as |CQ|
    >
      <header>
        <h2>Widget 2</h2>
      </header>

      {{#unless CQ.features.short}}
        <div class={{this.styles.visualization}} data-test-visualization>
          <Widgets::Widget-2::StackedChart @data={{this.data}} />
        </div>
      {{/unless}}

      <div class={{this.styles.captions}} data-test-captions>
        <Widgets::Widget-2::Captions @summaries={{this.summaries}} />
      </div>
    </ContainerQuery>
  </template>
}
