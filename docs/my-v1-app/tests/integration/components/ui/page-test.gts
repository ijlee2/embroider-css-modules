import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { UiPage } from 'my-v2-addon';
import { getClassForUiPage } from 'my-v2-addon/test-support';
import { module, test } from 'qunit';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <UiPage @title="Form">
          Render a section here.
        </UiPage>
      </template>,
    );

    assert.dom('[data-test-page-title]').hasTagName('h1').hasText('Form');

    assert.dom('[data-test-page-content]').hasText('Render a section here.');

    await a11yAudit();
  });

  test('CSS modules', async function (assert) {
    await render(
      <template>
        <UiPage @title="Form">
          Render a section here.
        </UiPage>
      </template>,
    );

    assert
      .dom('[data-test-page-title]')
      .hasClass(getClassForUiPage('title'))
      .hasStyle({
        'font-weight': '700',
      });
  });

  test('We can render sections and subsections', async function (assert) {
    await render(
      <template>
        <UiPage @title="embroider-css-modules with ember-css-modules" as |Page|>
          <Page.Section>
            <:title>
              Package:
              <code>ember-css-modules</code>
            </:title>

            <:content>
              <Page.Subsection>
                <:title>
                  Attribute:
                  <code>local-class</code>
                </:title>

                <:content>
                  <Page.Demo>
                    Render a demo here.
                  </Page.Demo>
                </:content>
              </Page.Subsection>

              <Page.Subsection>
                <:title>
                  Helper:
                  <code>&#123;&#123;local-class&#125;&#125;</code>
                </:title>

                <:content>
                  <Page.Demo>
                    Render a demo here.
                  </Page.Demo>
                </:content>
              </Page.Subsection>
            </:content>
          </Page.Section>
        </UiPage>
      </template>,
    );

    assert.dom('[data-test-section-title]').exists({ count: 1 });

    assert.dom('[data-test-subsection-title]').exists({ count: 2 });

    await a11yAudit();
  });
});
