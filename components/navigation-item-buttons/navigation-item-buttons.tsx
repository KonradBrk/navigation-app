import { NavigationItemType } from "@/types/navigation-item";

type NavigationItemButtonsProps = {
  item: NavigationItemType;
  updateItem: (updatedItem: NavigationItemType) => NavigationItemType[];
  deleteItem: (id: string) => NavigationItemType[];
  createItem: (parentId?: string) => NavigationItemType[];
};

export const NavigationItemButtons = ({
  item,
  createItem,
  deleteItem,
  updateItem,
}: NavigationItemButtonsProps) => {
  return (
    <div className="flex border border-gray-300 rounded-md overflow-hidden">
      <button
        onClick={() => deleteItem(item.id)}
        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-200 border-r border-gray-300"
      >
        Usuń
      </button>
      <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-200 border-r border-gray-300">
        Edytuj
      </button>
      <button
        onClick={() => createItem(item.id)}
        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-200"
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};
