import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { Concert } from '../../data/concert';
import concertData from '../../data/concert';
import styles from './widget-3.css';

interface WidgetsWidget3Signature {
  Args: {};
}

export default class WidgetsWidget3Component extends Component<WidgetsWidget3Signature> {
  @tracked concertData = {} as Concert;

  styles = styles;

  constructor(owner: Owner, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
  }

  <template>
    <section class={{this.styles.container}}>
      <header class={{this.styles.header}}>
        <h2>Widget 3</h2>

        <div class={{this.styles.actions}}>
          <a data-test-link="All tours" href="#">
            All tours
          </a>
        </div>
      </header>

      <div class={{this.styles.tour-schedule}} data-test-tour-schedule>
        <Widgets::Widget-3::TourSchedule @concert={{this.concertData}} />
      </div>
    </section>
  </template>
}
