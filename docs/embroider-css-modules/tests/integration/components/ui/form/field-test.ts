import type { TestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import styles from 'docs-app-for-embroider-css-modules/components/ui/form/field.css';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

import { setupRenderingTest } from '../../../../helpers';

module('Integration | Component | ui/form/field', function (hooks) {
  setupRenderingTest(hooks);

  test('The component handles the field layout', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Field>
        <:label as |l|>
          <label
            data-test-label
            for={{l.inputId}}
          >
            Name
          </label>
        </:label>

        <:field as |f|>
          <input
            data-test-field="Name"
            id={{f.inputId}}
            type="text"
          />
        </:field>
      </Ui::Form::Field>
    `);

    assert
      .dom('[data-test-field-container]')
      .hasClass(styles['container'], 'We see the container class.')
      .doesNotHaveClass(
        styles['is-inline'],
        'We should not see the is-inline class.',
      )
      .doesNotHaveClass(
        styles['is-wide'],
        'We should not see the is-wide class.',
      )
      .hasClass(styles['no-feedback'], 'We see the no-feedback class.');

    assert.dom('[data-test-label]').hasText('Name', 'We see the label.');

    assert.dom('[data-test-field="Name"]').hasValue('', 'We see the field.');

    assert
      .dom('[data-test-feedback]')
      .doesNotExist('We should not see an error message.');

    await a11yAudit();

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('We can pass @errorMessage to show an error message', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <Ui::Form::Field
        @errorMessage="Please provide a value."
      >
        <:label as |l|>
          <label
            data-test-label
            for={{l.inputId}}
          >
            Name
          </label>
        </:label>

        <:field as |f|>
          <input
            data-test-field="Name"
            id={{f.inputId}}
            required
            type="text"
          />
        </:field>
      </Ui::Form::Field>
    `);

    assert
      .dom('[data-test-field-container]')
      .hasClass(styles['container'], 'We see the container class.')
      .doesNotHaveClass(
        styles['is-inline'],
        'We should not see the is-inline class.',
      )
      .doesNotHaveClass(
        styles['is-wide'],
        'We should not see the is-wide class.',
      )
      .doesNotHaveClass(
        styles['no-feedback'],
        'We should not see the no-feedback class.',
      );

    assert
      .dom('[data-test-feedback]')
      .hasText('Please provide a value.', 'We see the error message.');
  });
});
