import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../../helpers';

module('Integration | Component | ui/page/section', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <Ui::Page::Section>
        <:title>
          Package:
          <code>embroider-css-modules</code>
        </:title>

        <:content>
          Render a subsection here.
        </:content>
      </Ui::Page::Section>
    `);

    assert
      .dom('[data-test-section-title]')
      .hasTagName('h2', 'The header level is correct.')
      .hasText('Package: embroider-css-modules', 'We see the section title.');

    assert
      .dom('[data-test-section-content]')
      .hasText('Render a subsection here.', 'We see the section content.');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
