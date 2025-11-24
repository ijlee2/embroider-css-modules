import templateOnlyComponent from '@ember/component/template-only';

const WidgetsWidget5 = templateOnlyComponent();

export default WidgetsWidget5;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-5': typeof WidgetsWidget5;
    'widgets/widget-5': typeof WidgetsWidget5;
  }
}
