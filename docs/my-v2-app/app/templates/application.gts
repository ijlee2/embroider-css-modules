import { pageTitle } from 'ember-page-title';
import Route from 'ember-route-template';

import Hello from '../components/hello';
import styles from './application.module.css';

export default Route(
  <template>
    {{pageTitle "Embroider CSS Modules"}}

    <div class={{styles.container}} data-test-hello-container>
      <Hello />
    </div>
  </template>,
);
