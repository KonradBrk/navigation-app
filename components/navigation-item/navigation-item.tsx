"use client";
import type { NavigationItemType } from "@/types/navigation-item";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { NavigationItemButtons } from "../navigation-item-buttons";
import { NavigationItemForm } from "@/forms";
import { classNames } from "@/utils";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";

import { DndContext, UniqueIdentifier, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDnd } from "@/hooks";

type NavigationItemProps = {
  item: NavigationItemType;
  level?: number;
  isLast?: boolean;
  isFirst?: boolean;
  updateItem: (updatedItem: NavigationItemType) => NavigationItemType[];
  deleteItem: (id: string) => NavigationItemType[];
  createItem: (parentId?: string) => NavigationItemType[];
  reorder: (
    sourceId: UniqueIdentifier,
    destinationId: UniqueIdentifier
  ) => NavigationItemType[];
};

export const NavigationItem = ({
  item,
  updateItem,
  deleteItem,
  createItem,
  reorder,
  level = 0,
  isLast = false,
  isFirst = false,
}: NavigationItemProps) => {
  const { handleDragEnd, sensors } = useDnd(reorder);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const [openEditForm, setOpenEditForm] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOpenEditForm = () => {
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  if (!item.name || openEditForm) {
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
          handleCloseEditForm={handleCloseEditForm}
        />
      </div>
    );
  }

  const hasSubMenu = item.subMenu?.length > 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
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
          <div className="cursor-grab" {...attributes} {...listeners}>
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
          handleOpenEditForm={handleOpenEditForm}
          createItem={createItem}
        />
      </div>
      {hasSubMenu && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={item.subMenu}
            strategy={verticalListSortingStrategy}
          >
            {item.subMenu.map((subItem, subIndex) => (
              <NavigationItem
                key={subItem.id}
                item={subItem}
                level={level + 1}
                isFirst={subIndex === 0}
                isLast={subIndex === item.subMenu.length - 1}
                updateItem={updateItem}
                deleteItem={deleteItem}
                createItem={createItem}
                reorder={reorder}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};
