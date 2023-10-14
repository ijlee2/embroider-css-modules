import type NavigationMenuComponent from './components/navigation-menu.ts';
import type UiPageComponent from './components/ui/page.ts';
import type UiPageDemoComponent from './components/ui/page/demo.ts';
import type UiPageSectionComponent from './components/ui/page/section.ts';
import type UiPageSubsectionComponent from './components/ui/page/subsection.ts';

export default interface MyV2AddonRegistry {
  NavigationMenu: typeof NavigationMenuComponent;
  'Ui::Page': typeof UiPageComponent;
  'Ui::Page::Demo': typeof UiPageDemoComponent;
  'Ui::Page::Section': typeof UiPageSectionComponent;
  'Ui::Page::Subsection': typeof UiPageSubsectionComponent;
  'ui/page/demo': typeof UiPageDemoComponent;
  'ui/page/section': typeof UiPageSectionComponent;
  'ui/page/subsection': typeof UiPageSubsectionComponent;
}
