import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { ContainerQuery, height, width } from 'ember-container-query';

import WidgetsWidget4MemoActions from './memo/actions';
import WidgetsWidget4MemoBody from './memo/body';
import WidgetsWidget4MemoHeader from './memo/header';

interface WidgetsWidget4MemoSignature {}

const WidgetsWidget4Memo: TOC<WidgetsWidget4MemoSignature> = <template>
  <ContainerQuery
    @features={{hash
      large=(width min=200)
      short=(height max=200)
      small=(width max=200)
    }}
    @tagName="article"
    class="components-widgets-widget-4-memo__container"
    as |CQ|
  >
    <div class="components-widgets-widget-4-memo__header-container">
      <WidgetsWidget4MemoHeader @cqFeatures={{CQ.features}} />
    </div>

    <div class="components-widgets-widget-4-memo__body-container">
      <WidgetsWidget4MemoBody @cqFeatures={{CQ.features}} />
    </div>

    <div class="components-widgets-widget-4-memo__actions-container">
      <WidgetsWidget4MemoActions @cqFeatures={{CQ.features}} />
    </div>
  </ContainerQuery>
</template>;

export default WidgetsWidget4Memo;
