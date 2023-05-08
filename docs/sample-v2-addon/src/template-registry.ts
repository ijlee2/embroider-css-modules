import type NavigationMenuComponent from './components/navigation-menu';
import type UiPageComponent from './components/ui/page';

export default interface SampleV2AddonRegistry {
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::Page': typeof UiPageComponent;
}
