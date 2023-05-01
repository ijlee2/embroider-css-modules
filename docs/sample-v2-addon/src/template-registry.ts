import type UiPageComponent from './components/ui/page';

export default interface SampleV2AddonRegistry {
  'Ui::Page': typeof UiPageComponent;
}
