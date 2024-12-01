import { NavigationItemType } from "@/types/navigation-item";
import {
  useSensors,
  useSensor,
  PointerSensor,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

export const useDnd = (
  reorder: (
    sourceId: UniqueIdentifier,
    destinationId: UniqueIdentifier
  ) => NavigationItemType[]
) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      reorder(active.id, over.id);
    }
  };

  return {
    sensors,
    handleDragEnd,
  };
};
