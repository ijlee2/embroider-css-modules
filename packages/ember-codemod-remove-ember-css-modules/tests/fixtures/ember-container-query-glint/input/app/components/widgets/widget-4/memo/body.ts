import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoBodyComponent =
  templateOnlyComponent<WidgetsWidget4MemoBodySignature>();

export default WidgetsWidget4MemoBodyComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
