import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import UiFormInformation from 'my-v1-app/components/ui/form/information';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../../helpers';

module('Integration | Component | ui/form/information', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders nothing when we do not pass @title or @instructions', async function (this: TestContext, assert) {
    await render(<template><UiFormInformation @formId="ember123" /></template>);

    assert
      .dom('[data-test-title]')
      .doesNotExist('We should not see the form title.');

    assert
      .dom('[data-test-instructions]')
      .doesNotExist('We should not see the form instructions.');
  });

  test('We can pass @title to display the form title', async function (this: TestContext, assert) {
    await render(
      <template>
        <UiFormInformation @formId="ember123" @title="Contact me" />
      </template>,
    );

    assert
      .dom('[data-test-title]')
      .hasAttribute('id', 'ember123-title', 'We see the correct ID.')
      .hasText('Contact me', 'We see the form title.');

    assert
      .dom('[data-test-instructions]')
      .doesNotExist('We should not see the form instructions.');
  });

  test('We can pass @instructions to display the form instructions', async function (this: TestContext, assert) {
    await render(
      <template>
        <UiFormInformation
          @formId="ember123"
          @instructions="Still have questions about embroider-css-modules? Try sending me a message."
        />
      </template>,
    );

    assert
      .dom('[data-test-title]')
      .doesNotExist('We should not see the form title.');

    assert
      .dom('[data-test-instructions]')
      .hasAttribute('id', 'ember123-instructions', 'We see the correct ID.')
      .hasText(
        'Still have questions about embroider-css-modules? Try sending me a message.',
        'We see the form instructions.',
      );
  });
});
