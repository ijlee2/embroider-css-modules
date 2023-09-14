import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { getClassForUiPage } from 'sample-v2-addon/test-support';

import { setupRenderingTest } from '../../../helpers';

module('Integration | Component | ui/page', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::Page @title="Form">
        Render a section here.
      </Ui::Page>
    `);

    assert
      .dom('[data-test-page-title]')
      .hasTagName('h1', 'The header level is correct.')
      .hasText('Form', 'We see the page title.');

    assert
      .dom('[data-test-page-content]')
      .hasText('Render a section here.', 'We see the page content.');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });

  test('CSS modules', async function (assert) {
    await render(hbs`
      <Ui::Page @title="Form">
        Render a section here.
      </Ui::Page>
    `);

    assert
      .dom('[data-test-page-title]')
      .hasClass(getClassForUiPage('title'), 'We see the local class name.')
      .hasStyle(
        {
          fontWeight: '700',
        },
        'We see the applied style.',
      );
  });

  test('We can render sections and subsections', async function (assert) {
    await render(hbs`
      <Ui::Page
        @title={{"embroider-css-modules-temporary"}}
        as |Page|
      >
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
      </Ui::Page>
    `);

    assert
      .dom('[data-test-section-title]')
      .exists({ count: 1 }, 'We see 1 section.');

    assert
      .dom('[data-test-subsection-title]')
      .exists({ count: 2 }, 'We see 2 subsections.');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
