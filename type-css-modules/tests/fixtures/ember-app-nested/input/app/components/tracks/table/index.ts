import Component from '@glimmer/component';

import type { Track } from '../../../data/album';
import styles from './index.css';

interface TracksTableComponentSignature {
  Args: {
    tracks?: Array<Track>;
  };
}

export default class TracksTableComponent extends Component<TracksTableComponentSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::Table': typeof TracksTableComponent;
  }
}
