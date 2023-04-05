import Component from '@glimmer/component';

import styles from './memo.css';

interface WidgetsWidget4MemoSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class WidgetsWidget4MemoComponent extends Component<WidgetsWidget4MemoSignature> {
  styles = styles;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo': typeof WidgetsWidget4MemoComponent;
    'widgets/widget-4/memo': typeof WidgetsWidget4MemoComponent;
  }
}
