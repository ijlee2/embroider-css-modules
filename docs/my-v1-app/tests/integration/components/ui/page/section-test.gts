import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import UiPageSection from 'my-v2-addon/components/ui/page/section';
import { module, test } from 'qunit';

module('Integration | Component | ui/page/section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <UiPageSection>
          <:title>
            Package:
            <code>embroider-css-modules</code>
          </:title>

          <:content>
            Render a subsection here.
          </:content>
        </UiPageSection>
      </template>,
    );

    assert
      .dom('[data-test-section-title]')
      .hasTagName('h2')
      .hasText('Package: embroider-css-modules');

    assert
      .dom('[data-test-section-content]')
      .hasText('Render a subsection here.');

    await a11yAudit();
  });
});
