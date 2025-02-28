import Route from 'ember-route-template';

import Hello from '../components/hello';
import styles from './index.module.css';

export default Route(
  <template>
    <div class={{styles.container}} data-test-hello-container>
      <Hello />
    </div>
  </template>,
);
