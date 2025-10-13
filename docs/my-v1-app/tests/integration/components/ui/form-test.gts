import { hash } from '@ember/helper';
import { find, render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import UiForm from 'my-v1-app/components/ui/form';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | ui/form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const doNothing = () => {};

    await render(
      <template>
        <UiForm
          @data={{hash
            email=undefined
            message="I 🧡 CSS modules!"
            name=undefined
            subscribe=true
          }}
          @instructions="Still have questions about embroider-css-modules? Try sending me a message."
          {{! @glint-expect-error: Incorrect type }}
          @onSubmit={{doNothing}}
          @title="Contact me"
          as |F|
        >
          <div>
            <F.Input
              @isRequired={{true}}
              @key="name"
              @label="Name"
              @placeholder="Zoey"
            />
          </div>

          <div>
            <F.Input
              @isRequired={{true}}
              @key="email"
              @label="Email"
              @placeholder="zoey@emberjs.com"
              @type="email"
            />
          </div>

          <div>
            <F.Textarea @key="message" @label="Message" />
          </div>

          <div>
            <F.Checkbox
              @key="subscribe"
              @label="Subscribe to The Ember Times?"
            />
          </div>
        </UiForm>
      </template>,
    );

    const titleId = find('[data-test-title]')!.getAttribute('id')!;
    const instructionsId = find('[data-test-instructions]')!.getAttribute(
      'id',
    )!;

    assert
      .dom('[data-test-form="Contact me"]')
      .hasAria('describedby', instructionsId)
      .hasAria('labelledby', titleId);

    assert.dom('[data-test-field]').exists({ count: 4 });

    assert
      .dom('[data-test-button="Submit"]')
      .hasAttribute('type', 'submit')
      .hasTagName('button')
      .hasText('Submit');

    await a11yAudit();
  });
});
