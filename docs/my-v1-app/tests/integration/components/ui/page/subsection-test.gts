import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import UiPageSubsection from 'my-v2-addon/components/ui/page/subsection';
import { module, test } from 'qunit';

module('Integration | Component | ui/page/subsection', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <UiPageSubsection>
          <:title>
            Helper:
            <code>&#123;&#123;local&#125;&#125;</code>
          </:title>

          <:content>
            Render a demo here.
          </:content>
        </UiPageSubsection>
      </template>,
    );

    assert
      .dom('[data-test-subsection-title]')
      .hasTagName('h3')
      .hasText('Helper: {{local}}');

    assert.dom('[data-test-subsection-content]').hasText('Render a demo here.');

    await a11yAudit();
  });
});
