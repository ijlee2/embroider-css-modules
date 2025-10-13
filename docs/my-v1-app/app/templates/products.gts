import type { TOC } from '@ember/component/template-only';
import { array, hash } from '@ember/helper';
import { pageTitle } from 'ember-page-title';
import { local } from 'embroider-css-modules';
// @ts-expect-error: File '/my-v1-app/app/components/products/product/card.ts' is not a module.
import ProductsProductCard from 'my-v1-app/components/products/product/card';
import UiFormInput from 'my-v1-app/components/ui/form/input';
import type ProductsController from 'my-v1-app/controllers/products';
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
            @onUpdate={{@controller.noOp}}
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
