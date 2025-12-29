import styles from './actions.module.css';
import type { TOC } from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Could not find a declaration file for module 'ember-svg-jar/helpers/svg-jar'.
import svgJar from 'ember-svg-jar/helpers/svg-jar';
import { or } from 'ember-truth-helpers';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoActions: TOC<WidgetsWidget4MemoActionsSignature> = <template><div
  class="{{styles.components-widgets-widget-4-memo-actions__actions}} {{if
      (or @cqFeatures.small @cqFeatures.short)
      'components-widgets-widget-4-memo-actions__minimal-layout'
    }}  "
  data-test-memo-actions
>
  <button
    aria-label="Comment"
    class={{styles.components-widgets-widget-4-memo-actions__button}}
    type="button"
  >
    {{svgJar
      "message-processing-outline"
      class=(local styles "components-widgets-widget-4-memo-actions__icon" "components-widgets-widget-4-memo-actions__icon-comment")
      desc="A speech bubble"
      role="img"
    }}
  </button>

  <button
    aria-label="Repost"
    class={{styles.components-widgets-widget-4-memo-actions__button}}
    type="button"
  >
    {{svgJar
      "sync"
      class=(local styles "components-widgets-widget-4-memo-actions__icon" "components-widgets-widget-4-memo-actions__icon-repost")
      desc="Two circular arrows pointing to each other"
      role="img"
    }}
  </button>

  <button
    aria-label="Like"
    class={{styles.components-widgets-widget-4-memo-actions__button}}
    type="button"
  >
    {{svgJar
      "heart-outline"
      class=styles.components-widgets-widget-4-memo-actions__icon
      desc="A heart"
      role="img"
    }}
  </button>

  <button
    aria-label="Share"
    class={{styles.components-widgets-widget-4-memo-actions__button}}
    type="button"
  >
    {{svgJar
      "share-variant-outline"
      class=styles.components-widgets-widget-4-memo-actions__icon
      desc="A circular node that branches out to two circular nodes"
      role="img"
    }}
  </button>
</div></template>;

export default WidgetsWidget4MemoActions;
