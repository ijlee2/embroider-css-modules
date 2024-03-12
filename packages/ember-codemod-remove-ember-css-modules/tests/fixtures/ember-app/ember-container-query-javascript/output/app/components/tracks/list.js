import Component from '@glimmer/component';

import styles from './list.css';

export default class TracksListComponent extends Component {
  styles = styles;

  get numColumns() {
    const { numColumns } = this.args;

    return numColumns ?? 1;
  }

  get numRows() {
    const { tracks } = this.args;

    if (!tracks) {
      return 0;
    }

    return Math.ceil(tracks.length / this.numColumns);
  }
}
