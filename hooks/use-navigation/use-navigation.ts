import { useState, useCallback } from "react";
import { NavigationItemType } from "@/types/navigation-item";
import { v4 as uuidv4 } from "uuid";

export const useNavigation = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItemType[]>(
    []
  );

  const findAndRemoveItem = useCallback(
    (
      items: NavigationItemType[],
      id: string
    ): [NavigationItemType | null, NavigationItemType[]] => {
      const updatedItems = [];
      let removedItem: NavigationItemType | null = null;

      for (const item of items) {
        if (item.id === id) {
          removedItem = item;
        } else if (item.subMenu.length) {
          const [subRemoved, updatedSub] = findAndRemoveItem(item.subMenu, id);
          if (subRemoved) removedItem = subRemoved;
          item.subMenu = updatedSub;
        }
        updatedItems.push(item);
      }

      return [removedItem, updatedItems];
    },
    []
  );

  const reorder = useCallback(
    (
      sourceId: string,
      destinationId: string,
      parentId: string | null = null
    ): NavigationItemType[] => {
      const addItemAtDestination = (
        items: NavigationItemType[],
        item: NavigationItemType,
        destinationId: string | null
      ): NavigationItemType[] => {
        if (destinationId === null) {
          return [...items, item];
        }

        return items.map((current) => {
          if (current.id === destinationId) {
            current.subMenu = [...current.subMenu, item];
          } else if (current.subMenu.length) {
            current.subMenu = addItemAtDestination(
              current.subMenu,
              item,
              destinationId
            );
          }
          return current;
        });
      };

      const [removedItem, updatedItems] = findAndRemoveItem(
        navigationItems,
        sourceId
      );

      if (!removedItem) {
        console.error("Source item not found");
        return navigationItems;
      }

      const finalItems = parentId
        ? addItemAtDestination(updatedItems, removedItem, destinationId)
        : [...updatedItems, removedItem];

      setNavigationItems(finalItems);
      return finalItems;
    },
    [findAndRemoveItem, navigationItems]
  );

  const createItem = useCallback(
    (parentId?: string): NavigationItemType[] => {
      const newItem: NavigationItemType = { id: uuidv4(), subMenu: [] };

      if (!parentId) {
        setNavigationItems([...navigationItems, newItem]);
      } else {
        const addToSubmenu = (
          items: NavigationItemType[]
        ): NavigationItemType[] =>
          items.map((current) => {
            if (current.id === parentId) {
              current.subMenu = [...current.subMenu, newItem];
            } else if (current.subMenu.length) {
              current.subMenu = addToSubmenu(current.subMenu);
            }
            return current;
          });

        setNavigationItems(addToSubmenu(navigationItems));
      }

      return navigationItems;
    },
    [navigationItems]
  );

  const updateItem = useCallback(
    (updatedItem: NavigationItemType): NavigationItemType[] => {
      const updateItem = (items: NavigationItemType[]): NavigationItemType[] =>
        items.map((current) => {
          if (current.id === updatedItem.id) {
            return { ...current, ...updatedItem };
          } else if (current.subMenu.length) {
            current.subMenu = updateItem(current.subMenu);
          }
          return current;
        });

      const updatedItems = updateItem(navigationItems);
      setNavigationItems(updatedItems);
      return updatedItems;
    },
    [navigationItems]
  );

  const deleteItem = useCallback(
    (id: string): NavigationItemType[] => {
      const deleteItemRecursively = (
        items: NavigationItemType[]
      ): NavigationItemType[] =>
        items
          .filter((current) => current.id !== id)
          .map((current) => {
            if (current.subMenu.length) {
              current.subMenu = deleteItemRecursively(current.subMenu);
            }
            return current;
          });

      const updatedItems = deleteItemRecursively(navigationItems);
      setNavigationItems(updatedItems);
      return updatedItems;
    },
    [navigationItems]
  );

  return {
    navigationItems,
    reorder,
    createItem,
    updateItem,
    deleteItem,
  };
};
