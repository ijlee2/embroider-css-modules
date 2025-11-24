import styles from './widget-5.module.css';
import Component from '@glimmer/component';

const WidgetsWidget5 = class extends Component {
  styles = styles;
};

export default WidgetsWidget5;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5;
    'widgets/widget-5': typeof WidgetsWidget5;
  }
}
