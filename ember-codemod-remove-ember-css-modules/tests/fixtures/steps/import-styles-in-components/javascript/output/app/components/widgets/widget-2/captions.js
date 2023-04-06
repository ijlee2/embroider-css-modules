import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import styles from './captions.css';

export default class WidgetsWidget2CaptionsComponent extends Component {
  styles = styles;

  @tracked currentIndex = 0;

  get canShowNextButton() {
    return this.currentIndex < this.summaries.length - 1;
  }

  get canShowPreviousButton() {
    return this.currentIndex > 0;
  }

  get summaries() {
    return this.args.summaries ?? [];
  }

  get summary() {
    return this.summaries[this.currentIndex];
  }

  @action showNextSummary(increment = 1) {
    const { currentIndex, summaries } = this;

    const numSummaries = summaries.length;
    const nextIndex = (currentIndex + increment + numSummaries) % numSummaries;

    this.currentIndex = nextIndex;
  }
}
