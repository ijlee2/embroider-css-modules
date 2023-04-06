import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import concertData from '../../data/concert';

import styles from './widget-3.css';

export default class WidgetsWidget3Component extends Component {
  styles = styles;

  @tracked concertData = {};

  constructor(owner, args) {
    super(owner, args);

    this.loadData();
  }

  loadData() {
    this.concertData = concertData;
  }
}
