import NavigationMenuComponent from "./components/navigation-menu.js";
import UiPageComponent from "./components/ui/page.js";
import UiPageDemoComponent from "./components/ui/page/demo.js";
import UiPageSectionComponent from "./components/ui/page/section.js";
import UiPageSubsectionComponent from "./components/ui/page/subsection.js";
interface SampleV2AddonRegistry {
    NavigationMenu: typeof NavigationMenuComponent;
    'Ui::Page': typeof UiPageComponent;
    'Ui::Page::Demo': typeof UiPageDemoComponent;
    'Ui::Page::Section': typeof UiPageSectionComponent;
    'Ui::Page::Subsection': typeof UiPageSubsectionComponent;
    'ui/page/demo': typeof UiPageDemoComponent;
    'ui/page/section': typeof UiPageSectionComponent;
    'ui/page/subsection': typeof UiPageSubsectionComponent;
}
export { SampleV2AddonRegistry as default };
