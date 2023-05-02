import type NavigationMenuNewComponent from './components/navigation-menu-new';
import type UiPageNewComponent from './components/ui/page-new';

export default interface SampleV2AddonRegistry {
  NavigationMenuNew: typeof NavigationMenuNewComponent;
  'Ui::PageNew': typeof UiPageNewComponent;
}
