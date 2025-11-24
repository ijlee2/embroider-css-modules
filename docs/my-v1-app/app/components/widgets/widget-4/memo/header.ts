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
