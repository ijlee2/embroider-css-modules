type MenuItem = {
  label: string;
  route: string;
};

export interface NavigationMenuSignature {
  Args: {
    menuItems: MenuItem[];
    name?: string;
  };
}
