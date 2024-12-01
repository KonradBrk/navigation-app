export type NavigationItemType = {
  id: string;
  name?: string;
  url?: string;
  subMenu: NavigationItemType[];
};
