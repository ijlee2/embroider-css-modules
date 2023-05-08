import type NavigationMenuComponent from './components/navigation-menu';
import type UiPageComponent from './components/ui/page';
import type UiPageDemoComponent from './components/ui/page/demo';
import type UiPageSectionComponent from './components/ui/page/section';
import type UiPageSubsectionComponent from './components/ui/page/subsection';

export default interface SampleV2AddonRegistry {
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::Page': typeof UiPageComponent;
  'Ui::Page::Demo': typeof UiPageDemoComponent;
  'Ui::Page::Section': typeof UiPageSectionComponent;
  'Ui::Page::Subsection': typeof UiPageSubsectionComponent;
  'ui/page/demo': typeof UiPageDemoComponent;
  'ui/page/section': typeof UiPageSectionComponent;
  'ui/page/subsection': typeof UiPageSubsectionComponent;
}
