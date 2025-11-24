import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { type Concert, concert } from 'my-v1-app/data/concert';

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
}
