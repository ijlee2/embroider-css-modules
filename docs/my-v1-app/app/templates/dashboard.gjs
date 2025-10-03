import { pageTitle } from 'ember-page-title';
import WidgetsWidget1 from 'my-v1-app/components/widgets/widget-1';
import WidgetsWidget2 from 'my-v1-app/components/widgets/widget-2';
import WidgetsWidget3 from 'my-v1-app/components/widgets/widget-3';
import WidgetsWidget4 from 'my-v1-app/components/widgets/widget-4';
import WidgetsWidget5 from 'my-v1-app/components/widgets/widget-5';
import { UiPage } from 'my-v2-addon';

<template>
  {{pageTitle "Dashboard"}}

  <UiPage @title="Dashboard">
    <div class={{@controller.styles.widgets}}>
      <div class={{@controller.styles.widget-1}} data-test-widget="1">
        <WidgetsWidget1 />
      </div>

      <div class={{@controller.styles.widget-2}} data-test-widget="2">
        <WidgetsWidget2 />
      </div>

      <div class={{@controller.styles.widget-3}} data-test-widget="3">
        <WidgetsWidget3 />
      </div>

      <div class={{@controller.styles.widget-4}} data-test-widget="4">
        <WidgetsWidget4 />
      </div>

      <div class={{@controller.styles.widget-5}} data-test-widget="5">
        <WidgetsWidget5 />
      </div>
    </div>
  </UiPage>
</template>
