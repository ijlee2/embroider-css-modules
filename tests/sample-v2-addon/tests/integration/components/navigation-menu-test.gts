import { array, hash } from '@ember/helper';
import { findAll, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { NavigationMenuNew } from 'sample-v2-addon';

import { setupRenderingTest } from '../../helpers';

module('Integration | Component | navigation-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('The component renders a navigation menu', async function (assert) {
    await render(
      <template>
        <NavigationMenuNew
          @menuItems={{array
            (hash label="Home" route="index")
          }}
          @name="Main Navigation"
        />
      </template>
    );

    assert
      .dom('[data-test-nav="Main Navigation"]')
      .hasAria(
        'label',
        'Main Navigation',
        'We can pass @name to specify the navigation.',
      )
      .hasTagName('nav', 'We see the correct tag name.');

    const links = findAll('[data-test-link]');

    assert.strictEqual(links.length, 1, 'We see 1 link.');

    assert
      .dom(links[0])
      .hasAttribute('href', '/', 'We see the correct href for the 1st link.')
      .hasText('Home', 'We see the correct label for the 1st link.');
  });

  test('CSS modules', async function (assert) {
    await render(
      <template>
        <NavigationMenuNew
          @menuItems={{array
            (hash label="Home" route="index")
          }}
          @name="Main Navigation"
        />
      </template>
    );

    assert.dom('[data-test-link="Home"]').hasClass(/^sample-v2-addon/, 'We see the local style.');
  });
});
