import type { NavigationItemType } from "@/types/navigation-item";
import Image from "next/image";

import { NavigationItemButtons } from "../navigation-item-buttons";
import { NavigationItemForm } from "@/forms";
import { classNames } from "@/utils";

type NavigationItemProps = {
  item: NavigationItemType;
  level?: number;
  isLast?: boolean;
  isFirst?: boolean;
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
}: NavigationItemProps) => {
  if (!item.name) {
    return (
      <div
        className={classNames(
          "bg-gray-50 px-6 pt-4",
          level > 0 && "pl-16",
          isLast && "pb-4"
        )}
      >
        <NavigationItemForm
          item={item}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      </div>
    );
  }

  const hasSubMenu = item.subMenu?.length > 0;

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
          updateItem={updateItem}
          deleteItem={deleteItem}
          createItem={createItem}
        />
      ))
    );
  };

  return (
    <div
      className={classNames(
        "w-full bg-gray-50",
        level > 0 && "pl-16",
        isFirst && level === 0 && "rounded-t-md"
      )}
    >
      <div
        className={classNames(
          "flex items-center justify-between p-4 bg-white border",
          (isLast || hasSubMenu) && "rounded-bl-md",
          isFirst && level === 0 && "rounded-t-md"
        )}
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
