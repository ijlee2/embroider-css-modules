import styles from './widget-1.module.css';
import { hash } from '@ember/helper';
import { aspectRatio, ContainerQuery } from 'ember-container-query';

import WidgetsWidget1Item from './widget-1/item';

const WidgetsWidget1 = <template>
  <ContainerQuery
    @features={{hash
      square=(aspectRatio max=1.25 min=0.8)
      tall=(aspectRatio max=0.8)
      wide=(aspectRatio min=1.25)
    }}
    @tagName="section"
    class={{styles.components-widgets-widget-1__container}}
  >
    <header>
      <h2>Widget 1</h2>
    </header>

    <div class={{styles.components-widgets-widget-1__items}}>
      <div class={{styles.components-widgets-widget-1__item-1}}>
        <WidgetsWidget1Item @title="Item 1" />
      </div>

      <div class={{styles.components-widgets-widget-1__item-2}}>
        <WidgetsWidget1Item @title="Item 2" />
      </div>

      <div class={{styles.components-widgets-widget-1__item-3}}>
        <WidgetsWidget1Item @title="Item 3" />
      </div>
    </div>
  </ContainerQuery>
</template>;

export default WidgetsWidget1;
