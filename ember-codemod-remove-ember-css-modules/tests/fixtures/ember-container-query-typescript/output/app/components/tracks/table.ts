import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from '../../data/album';

import styles from './table.css';

interface TracksTableSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksTableComponent = templateOnlyComponent<TracksTableSignature>();

export default TracksTableComponent;
