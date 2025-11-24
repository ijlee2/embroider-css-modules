import templateOnlyComponent from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoHeader =
  templateOnlyComponent<WidgetsWidget4MemoHeaderSignature>();

export default WidgetsWidget4MemoHeader;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeader;
    'widgets/widget-4/memo/header': typeof WidgetsWidget4MemoHeader;
  }
}
