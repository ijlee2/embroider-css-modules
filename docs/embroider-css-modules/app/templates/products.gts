import type { TOC } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import ProductsProductCard from 'docs-app-for-embroider-css-modules/components/products/product/card';
import UiFormInput from 'docs-app-for-embroider-css-modules/components/ui/form/input';
import type ProductsController from 'docs-app-for-embroider-css-modules/controllers/products';
import { pageTitle } from 'ember-page-title';
import { local } from 'embroider-css-modules';
import { UiPage } from 'my-v2-addon';

import styles from './products.module.css';

interface ProductsSignature {
  controller: ProductsController;
  model: unknown;
}

<template>
  {{pageTitle "Products"}}

  <UiPage @title="Products">
    <div
      class={{local
        styles
        (if
          @controller.isPartOfNestProductDetailsExperiment
          (array "shared-layout" "products-with-details")
          (array "shared-layout" "products")
        )
        "sticky-container"
      }}
    >
      <div class={{styles.filters}}>
        <div class={{styles.filter}}>
          <UiFormInput
            @data={{hash name=@controller.name}}
            @key="name"
            @label="Filter by"
            @onUpdate={{@controller.updateQueryParameters}}
            @placeholder="Cake, pasta, etc."
          />
        </div>
      </div>

      <div class={{styles.list}}>
        {{#each @controller.filteredProducts as |product|}}
          <ProductsProductCard @product={{product}} />
        {{else}}
          <p>
            No products found.
          </p>
        {{/each}}
      </div>

      <div class={{styles.product-details}}>
        {{outlet}}
      </div>
    </div>
  </UiPage>
</template> satisfies TOC<ProductsSignature>;
