"use client";

import { NavigationListEmptyState } from "@/components/navigation-list-empty-state";
import { NavigationItem } from "@/components/navigation-item";
import { NavigationListAddButton } from "../navigation-list-add-button";
import { useNavigation } from "@/hooks";

export const NavigationList = () => {
  const { navigationItems, createItem, updateItem, deleteItem } =
    useNavigation();

  if (!navigationItems.length) {
    return (
      <div className="flex gap-2 flex-col w-full">
        <NavigationListEmptyState onClick={() => createItem()} />
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-300 rounded-md">
      {navigationItems.map((item, index) => (
        <NavigationItem
          key={item.id}
          item={item}
          isLast={navigationItems.length - 1 === index}
          isFirst={index === 0}
          deleteItem={deleteItem}
          updateItem={updateItem}
          createItem={createItem}
        />
      ))}
      <NavigationListAddButton onClick={() => createItem()} />
    </div>
  );
};
