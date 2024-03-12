import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import musicRevenue from '../../data/music-revenue';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from '../../utils/components/widgets/widget-2';

import styles from './widget-2.css';

export default class WidgetsWidget2Component extends Component {
  styles = styles;

  @tracked data = [];
  @tracked summaries = [];

  constructor(owner, args) {
    super(owner, args);

    this.loadData();
  }

  loadData() {
    this.data = createDataForVisualization(musicRevenue);
    this.summaries = createSummariesForCaptions(this.data);
  }
}
