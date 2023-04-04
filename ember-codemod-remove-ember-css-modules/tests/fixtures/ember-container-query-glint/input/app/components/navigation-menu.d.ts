type MenuItem = {
  label: string;
  route: string;
};

export interface NavigationMenuComponentSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}
