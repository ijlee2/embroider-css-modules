import styles from './memo.module.css';
import Component from '@glimmer/component';

interface WidgetsWidget4MemoSignature {}

const WidgetsWidget4Memo = class extends Component<WidgetsWidget4MemoSignature> {
  styles = styles;
};

export default WidgetsWidget4Memo;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4Memo;
    'widgets/widget-4/memo': typeof WidgetsWidget4Memo;
  }
}
