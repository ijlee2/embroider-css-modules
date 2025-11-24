import templateOnlyComponent from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoActions =
  templateOnlyComponent<WidgetsWidget4MemoActionsSignature>();

export default WidgetsWidget4MemoActions;
