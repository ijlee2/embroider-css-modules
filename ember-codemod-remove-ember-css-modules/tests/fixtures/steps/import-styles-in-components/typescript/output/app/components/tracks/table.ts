import Component from '@glimmer/component';

import type { Track } from '../../data/album';

import styles from './table.css';

interface TracksTableSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksTableComponent = class extends Component {};

export default TracksTableComponent;
