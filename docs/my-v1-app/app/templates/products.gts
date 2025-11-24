import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { pageTitle } from 'ember-page-title';
import ProductsProductCard from 'my-v1-app/components/products/product/card';
import UiFormInput from 'my-v1-app/components/ui/form/input';
import type ProductsController from 'my-v1-app/controllers/products';
import { UiPage } from 'my-v2-addon';

interface ProductsSignature {
  controller: ProductsController;
  model: unknown;
}

<template>
  {{pageTitle "Products"}}

  <UiPage @title="Products">
    <div
      class="{{if
          @controller.isPartOfNestProductDetailsExperiment
          'templates-products__shared-layout templates-products__products-with-details'
          'templates-products__shared-layout templates-products__products'
        }}
        templates-products__sticky-container"
    >
      <div class="templates-products__filters">
        <div class="templates-products__filter">
          <UiFormInput
            @data={{hash name=@controller.name}}
            @key="name"
            @label="Filter by"
            @onUpdate={{@controller.noOp}}
            @placeholder="Cake, pasta, etc."
          />
        </div>
      </div>

      <div class="templates-products__list">
        {{#each @controller.filteredProducts as |product|}}
          <ProductsProductCard @product={{product}} />
        {{else}}
          <p>
            No products found.
          </p>
        {{/each}}
      </div>

      <div class="templates-products__product-details">
        {{outlet}}
      </div>
    </div>
  </UiPage>
</template> satisfies TOC<ProductsSignature>;
