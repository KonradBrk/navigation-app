import { useState, useCallback } from "react";
import { NavigationItemType } from "@/types/navigation-item";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

export const useNavigation = () => {
  const [navigationItems, setNavigationItems] = useState<NavigationItemType[]>(
    []
  );

  const reorder = useCallback(
    (
      sourceId: UniqueIdentifier,
      destinationId: UniqueIdentifier
    ): NavigationItemType[] => {
      const findAndReorder = (
        items: NavigationItemType[],
        sourceId: UniqueIdentifier,
        destinationId: UniqueIdentifier
      ): NavigationItemType[] => {
        const sourceIndex = items.findIndex((item) => item.id === sourceId);
        const destinationIndex = items.findIndex(
          (item) => item.id === destinationId
        );

        if (sourceIndex !== -1 && destinationIndex !== -1) {
          return arrayMove(items, sourceIndex, destinationIndex);
        }

        return items.map((item) => {
          if (item.subMenu.length) {
            item.subMenu = findAndReorder(
              item.subMenu,
              sourceId,
              destinationId
            );
          }
          return item;
        });
      };

      const updatedItems = findAndReorder(
        navigationItems,
        sourceId,
        destinationId
      );
      setNavigationItems(updatedItems);
      return updatedItems;
    },
    [navigationItems]
  );

  const createItem = useCallback(
    (parentId?: string): NavigationItemType[] => {
      const newItem: NavigationItemType = { id: uuidv4(), subMenu: [] };

      if (!parentId) {
        setNavigationItems([...navigationItems, newItem]);
      } else {
        const addToSubmenuRecursively = (
          items: NavigationItemType[]
        ): NavigationItemType[] =>
          items.map((current) => {
            if (current.id === parentId) {
              current.subMenu = [...current.subMenu, newItem];
            } else if (current.subMenu.length) {
              current.subMenu = addToSubmenuRecursively(current.subMenu);
            }
            return current;
          });

        setNavigationItems(addToSubmenuRecursively(navigationItems));
      }

      return navigationItems;
    },
    [navigationItems]
  );

  const updateItem = useCallback(
    (updatedItem: NavigationItemType): NavigationItemType[] => {
      const updateItemRecursively = (
        items: NavigationItemType[]
      ): NavigationItemType[] =>
        items.map((current) => {
          if (current.id === updatedItem.id) {
            return { ...current, ...updatedItem };
          } else if (current.subMenu.length) {
            current.subMenu = updateItemRecursively(current.subMenu);
          }
          return current;
        });

      const updatedItems = updateItemRecursively(navigationItems);
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
