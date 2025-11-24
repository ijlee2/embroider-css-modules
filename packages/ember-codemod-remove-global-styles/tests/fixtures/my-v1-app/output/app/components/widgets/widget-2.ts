import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { revenues } from 'my-v1-app/data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
  type Data,
  type Summary,
} from 'my-v1-app/utils/components/widgets/widget-2';

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
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-2': typeof WidgetsWidget2;
    'widgets/widget-2': typeof WidgetsWidget2;
  }
}
