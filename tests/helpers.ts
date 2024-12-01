import { NavigationItemType } from "@/types/navigation-item";

export const mockNavigationItems: NavigationItemType[] = [
  {
    id: "1",
    name: "Home",
    url: "/home",
    subMenu: [],
  },
  {
    id: "2",
    name: "Products",
    url: "/products",
    subMenu: [
      {
        id: "2-1",
        name: "Electronics",
        url: "/products/electronics",
        subMenu: [
          {
            id: "2-1-1",
            name: "Phones",
            url: "/products/electronics/phones",
            subMenu: [],
          },
          {
            id: "2-1-2",
            name: "Laptops",
            url: "/products/electronics/laptops",
            subMenu: [],
          },
        ],
      },
      {
        id: "2-2",
        name: "Clothing",
        url: "/products/clothing",
        subMenu: [
          {
            id: "2-2-1",
            name: "Men",
            url: "/products/clothing/men",
            subMenu: [],
          },
          {
            id: "2-2-2",
            name: "Women",
            url: "/products/clothing/women",
            subMenu: [],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "About Us",
    url: "/about",
    subMenu: [],
  },
  {
    id: "4",
    name: "Contact",
    url: "/contact",
    subMenu: [
      {
        id: "4-1",
        name: "Support",
        url: "/contact/support",
        subMenu: [],
      },
      {
        id: "4-2",
        name: "Sales",
        url: "/contact/sales",
        subMenu: [],
      },
    ],
  },
];
