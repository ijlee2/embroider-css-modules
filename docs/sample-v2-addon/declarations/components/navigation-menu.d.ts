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
export default class NavigationMenuComponent extends Component<NavigationMenuSignature> {
    styles: {
        readonly link: string;
        readonly list: string;
    };
}
export {};
//# sourceMappingURL=navigation-menu.d.ts.map