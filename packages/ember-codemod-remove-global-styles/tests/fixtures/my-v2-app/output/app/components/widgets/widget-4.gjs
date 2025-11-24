import styles from './widget-4.module.css';
import WidgetsWidget4Memo from './widget-4/memo';

const WidgetsWidget4 = <template>
  <section class={{styles.components-widgets-widget-4__container}}>
    <header class={{styles.components-widgets-widget-4__header}}>
      <h2>Widget 4</h2>
    </header>

    <div class={{styles.components-widgets-widget-4__memo-highlight}}>
      <WidgetsWidget4Memo />
    </div>

    <div class={{styles.components-widgets-widget-4__actions}}>
      <a data-test-link="All memos" href="#">
        All memos
      </a>
    </div>
  </section>
</template>;

export default WidgetsWidget4;
