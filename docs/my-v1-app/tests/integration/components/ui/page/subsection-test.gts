import UiPageSubsection from 'my-v2-addon/components/ui/page/subsection';

import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../../helpers';

module('Integration | Component | ui/page/subsection', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(<template>
    <UiPageSubsection>
    <:title>
      Helper:
      <code>&#123;&#123;local&#125;&#125;</code>
    </:title>

    <:content>
      Render a demo here.
    </:content>
    </UiPageSubsection>
    </template>);

    assert
      .dom('[data-test-subsection-title]')
      .hasTagName('h3', 'The header level is correct.')
      .hasText('Helper: {{local}}', 'We see the subsection title.');

    assert
      .dom('[data-test-subsection-content]')
      .hasText('Render a demo here.', 'We see the subsection content.');

    await a11yAudit();

    assert.ok(true, 'We passed Axe tests.');
  });
});
