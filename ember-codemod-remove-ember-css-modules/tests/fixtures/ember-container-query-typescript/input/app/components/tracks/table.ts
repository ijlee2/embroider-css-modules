import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from '../../data/album';

interface TracksTableComponentSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksTableComponent =
  templateOnlyComponent<TracksTableComponentSignature>();

export default TracksTableComponent;