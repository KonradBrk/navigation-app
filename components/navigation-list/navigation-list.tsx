"use client";

import { NavigationListEmptyState } from "@/components/navigation-list-empty-state";
import { NavigationItem } from "@/components/navigation-item";
import { NavigationListAddButton } from "../navigation-list-add-button";
import { useNavigation } from "@/hooks";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDnd } from "@/hooks/use-dnd/use-dnd";

export const NavigationList = () => {
  const { navigationItems, reorder, createItem, updateItem, deleteItem } =
    useNavigation();

  const { handleDragEnd, sensors } = useDnd(reorder);

  if (!navigationItems.length) {
    return <NavigationListEmptyState onClick={() => createItem()} />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={navigationItems}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col items-end w-full border bg-gray-50 border-gray-300 rounded-md">
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={item.id}
              item={item}
              isLast={navigationItems.length - 1 === index}
              isFirst={index === 0}
              deleteItem={deleteItem}
              updateItem={updateItem}
              createItem={createItem}
              reorder={reorder}
            />
          ))}
          <NavigationListAddButton onClick={() => createItem()} />
        </div>
      </SortableContext>
    </DndContext>
  );
};
