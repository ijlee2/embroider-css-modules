import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from '../data/album';

interface TracksSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksComponent = templateOnlyComponent<TracksSignature>();

export default TracksComponent;
