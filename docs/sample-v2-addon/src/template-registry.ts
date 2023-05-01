import type NavigationMenuComponent from './components/navigation-menu';
import type UiPageNewComponent from './components/ui/page-new';

export default interface SampleV2AddonRegistry {
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::PageNew': typeof UiPageNewComponent;
}
