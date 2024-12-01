import type { NavigationItemType } from "@/types/navigation-item";
import Image from "next/image";

import { NavigationItemButtons } from "../navigation-item-buttons";
import { NavigationItemForm } from "@/forms";

type NavigationItemProps = {
  item: NavigationItemType;
  level?: number;
  isLast?: boolean;
  isFirst?: boolean;
  isPreviousHasSubMenu?: boolean;
  updateItem: (updatedItem: NavigationItemType) => NavigationItemType[];
  deleteItem: (id: string) => NavigationItemType[];
  createItem: (parentId?: string) => NavigationItemType[];
};

export const NavigationItem = ({
  item,
  updateItem,
  deleteItem,
  createItem,
  level = 0,
  isLast = false,
  isFirst = false,
  isPreviousHasSubMenu = false,
}: NavigationItemProps) => {
  if (!item.name) {
    return (
      <div className={`bg-gray-50 px-6 pt-4 ${isLast ? "pb-4" : ""}`}>
        <NavigationItemForm
          item={item}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      </div>
    );
  }

  const hasSubMenu = item.subMenu?.length > 0;

  const borderStyles = () => {
    if (level === 0) {
      if (isFirst) {
        return "rounded-t-md border-b border-gray-300";
      }

      if (isPreviousHasSubMenu && !hasSubMenu) {
        return "border-t border-b border-gray-300";
      }

      if (isPreviousHasSubMenu) {
        return "border-t border-gray-300";
      }

      return "border-b border-gray-300";
    }

    if (level > 0) {
      if (isFirst && isLast) {
        return `border-b border-l border-gray-300 ${
          hasSubMenu ? "rounded-bl-md" : ""
        }`;
      }
      if (isFirst) {
        return `border-b border-l border-gray-300 ${
          hasSubMenu ? "rounded-bl-md" : ""
        }`;
      }
      if (isLast) {
        return `border-l border-gray-300 ${
          isPreviousHasSubMenu
            ? "border-t border-b rounded-tl-md rounded-bl-md"
            : "rounded-bl-md"
        }`;
      }

      return `border-l border-b ${
        hasSubMenu ? "border-t" : ""
      } border-gray-300`;
    }

    return "";
  };

  const renderSubItems = () => {
    return (
      hasSubMenu &&
      item.subMenu.map((subItem, subIndex) => (
        <NavigationItem
          key={subItem.id}
          item={subItem}
          level={level + 1}
          isFirst={subIndex === 0}
          isLast={subIndex === item.subMenu.length - 1}
          isPreviousHasSubMenu={
            subIndex === item.subMenu.length - 1 && subItem.subMenu?.length > 0
          }
          updateItem={updateItem}
          deleteItem={deleteItem}
          createItem={createItem}
        />
      ))
    );
  };

  return (
    <div
      className={`w-full bg-gray-50 ${level > 0 ? "pl-16" : ""} ${
        isFirst && level === 0 ? "rounded-lg" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between p-4 bg-white ${borderStyles()}`}
      >
        <div className="flex items-center space-x-4">
          <div className="cursor-grab">
            <Image src="/move.svg" alt="Move" width={20} height={20} priority />
          </div>
          <div>
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.url}</p>
          </div>
        </div>
        <NavigationItemButtons
          item={item}
          deleteItem={deleteItem}
          updateItem={updateItem}
          createItem={createItem}
        />
      </div>
      {renderSubItems()}
    </div>
  );
};
