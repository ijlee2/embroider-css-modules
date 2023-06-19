import Component from '@glimmer/component';
type MenuItem = {
    label: string;
    route: string;
};
interface NavigationMenuSignature {
    Args: {
        menuItems: MenuItem[];
        name?: string;
    };
}
declare class NavigationMenuComponent extends Component<NavigationMenuSignature> {
    styles: {
        readonly link: string;
        readonly list: string;
    };
}
export { NavigationMenuComponent as default };
//# sourceMappingURL=components/navigation-menu.d.ts.map