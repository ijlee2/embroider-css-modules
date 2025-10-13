import { array, hash } from '@ember/helper';
import { findAll, render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { NavigationMenu } from 'my-v2-addon';
import { getClassForNavigationMenu } from 'my-v2-addon/test-support';
import { module, test } from 'qunit';

module('Integration | Component | navigation-menu', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(
      <template>
        <NavigationMenu
          @menuItems={{array (hash label="Home" route="index")}}
          @name="Main Navigation"
        />
      </template>,
    );

    assert
      .dom('[data-test-nav="Main Navigation"]')
      .hasAria('label', 'Main Navigation')
      .hasTagName('nav');

    const links = findAll('[data-test-link]');

    assert.strictEqual(links.length, 1);

    assert.dom(links[0]).hasAttribute('href', '/').hasText('Home');

    await a11yAudit();
  });

  test('CSS modules', async function (assert) {
    await render(
      <template>
        <NavigationMenu
          @menuItems={{array (hash label="Home" route="index")}}
          @name="Main Navigation"
        />
      </template>,
    );

    assert
      .dom('[data-test-link="Home"]')
      .hasClass(getClassForNavigationMenu('link'))
      .hasStyle({
        'text-decoration-line': 'none',
      });
  });
});
