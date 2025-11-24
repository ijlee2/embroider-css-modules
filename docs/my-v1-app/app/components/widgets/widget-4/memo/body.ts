import templateOnlyComponent from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoBody =
  templateOnlyComponent<WidgetsWidget4MemoBodySignature>();

export default WidgetsWidget4MemoBody;
