import type { TestContext } from '@ember/test-helpers';
import { findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | navigation-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a navigation menu', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      <NavigationMenu
        @menuItems={{array
          (hash route="index" label="Home")
          (hash label="Form" route="form")
          (hash label="Products" route="products")
        }}
        @name="Main Navigation"
      />
    `);

    assert
      .dom('[data-test-nav="Main Navigation"]')
      .hasAria(
        'label',
        'Main Navigation',
        'We can pass @name to specify the navigation.',
      )
      .hasTagName('nav', 'We see the correct tag name.');

    const links = findAll('[data-test-link]');

    assert.strictEqual(links.length, 3, 'We see 3 links.');

    assert
      .dom(links[0])
      .hasAttribute('href', '/', 'We see the correct href for the 1st link.')
      .hasText('Home', 'We see the correct label for the 1st link.');

    assert
      .dom(links[1])
      .hasAttribute(
        'href',
        '/form',
        'We see the correct href for the 1st link.',
      )
      .hasText('Form', 'We see the correct label for the 1st link.');

    assert
      .dom(links[2])
      .hasAttribute(
        'href',
        '/products',
        'We see the correct href for the 2nd link.',
      )
      .hasText('Products', 'We see the correct label for the 2nd link.');
  });
});
