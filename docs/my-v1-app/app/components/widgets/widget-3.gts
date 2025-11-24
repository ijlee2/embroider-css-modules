import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { type Concert, concert } from 'my-v1-app/data/concert';

import WidgetsWidget3TourSchedule from './widget-3/tour-schedule';

interface WidgetsWidget3Signature {
  Args: {};
}

export default class WidgetsWidget3 extends Component<WidgetsWidget3Signature> {
  @tracked concertData = {} as Concert;

  constructor(owner: Owner, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concert;
  }

  <template>
    <section class="components-widgets-widget-3__container">
      <header class="components-widgets-widget-3__header">
        <h2>Widget 3</h2>

        <div class="components-widgets-widget-3__actions">
          <a data-test-link="All tours" href="#">
            All tours
          </a>
        </div>
      </header>

      <div
        class="components-widgets-widget-3__tour-schedule"
        data-test-tour-schedule
      >
        <WidgetsWidget3TourSchedule @concert={{this.concertData}} />
      </div>
    </section>
  </template>
}
