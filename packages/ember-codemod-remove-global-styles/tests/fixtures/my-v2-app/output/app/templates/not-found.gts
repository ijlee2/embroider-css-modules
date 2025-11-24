import { hash } from '@ember/helper';
import { ContainerQuery, width } from 'ember-container-query';
import { pageTitle } from 'ember-page-title';
import { UiPage } from 'my-v2-addon';

export default <template>
  {{pageTitle "Page Not Found"}}

  <UiPage @title="404">
    <p>Feeling lost? Un<em>contained</em>?</p>
    <p>Don't worry. We all have our off days.</p>

    <div class={{styles.templates-not-found__animation}}>
      <ContainerQuery @features={{hash small=(width max=350)}} as |CQ|>
        <div
          class="{{styles.templates-not-found__metaphor}} {{if CQ.features.small 'templates-not-found__small-layout'}}  "
        >
          <div class={{styles.templates-not-found__mental-block}}>
          </div>

          <div aria-hidden="true" class={{styles.templates-not-found__the-next-idea}}>
            embroider-<br />css-<br />modules
          </div>
        </div>
      </ContainerQuery>
    </div>
  </UiPage>
</template>;
