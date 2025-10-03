import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { render } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupRenderingTest } from 'ember-qunit';
import ProductsProductCard from 'my-v1-app/components/products/product/card';
import styles from 'my-v1-app/components/products/product/card.css';
import type { Product } from 'my-v1-app/data/products';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  product: Product;
}

module('Integration | Component | products/product/card', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.product = {
      description: 'Made with organic herbs',
      id: '1',
      imageUrl:
        'https://images.pexels.com/photos/414645/pexels-photo-414645.jpeg?auto=compress&cs=tinysrgb&dpr=1&h=256',
      name: 'Vanilla Ice Cream Cake',
      price: 40,
      rating: 4.5,
      seller: "Amy's",
      shortDescription: 'Made with organic herbs',
    };
  });

  test('The component renders a product', async function (this: TestContext, assert) {
    const self = this;

    await render(
      <template>
        <ProductsProductCard
          @product={{self.product}}
          @redirectTo="products.product"
        />
      </template>,
    );

    assert
      .dom('[data-test-field="Name"]')
      .hasText('Vanilla Ice Cream Cake', 'We see the product name.');

    assert
      .dom('[data-test-field="Short Description"]')
      .hasText(
        'Made with organic herbs',
        'We see the product short description.',
      );

    assert
      .dom('[data-test-field="Price"]')
      .hasText('$40', 'We see the product price.');

    assert
      .dom('[data-test-link="Learn More"]')
      .hasTagName('a', 'We see the correct tag name.')
      .hasText('Learn more', 'We see the learn more link.');

    await a11yAudit({
      rules: {
        'scrollable-region-focusable': {
          enabled: false,
        },
      },
    });

    assert.ok(true, 'We passed the accessibility audit.');
  });

  test('CSS modules', async function (this: TestContext, assert) {
    const self = this;

    await render(
      <template>
        <ProductsProductCard
          @product={{self.product}}
          @redirectTo="products.product"
        />
      </template>,
    );

    assert
      .dom('[data-test-link="Learn More"]')
      .hasClass(styles.link, 'We see the local class name.')
      .hasStyle(
        {
          'text-decoration-line': 'none',
        },
        'We see the applied style.',
      );
  });
});
