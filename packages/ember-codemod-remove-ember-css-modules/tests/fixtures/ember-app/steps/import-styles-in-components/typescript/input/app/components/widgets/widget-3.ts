import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { Concert } from '../../data/concert';
import concertData from '../../data/concert';

interface WidgetsWidget3Signature {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args: {};
}

export default class WidgetsWidget3Component extends Component<WidgetsWidget3Signature> {
  @tracked concertData = {} as Concert;

  constructor(owner: unknown, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
  }
}
