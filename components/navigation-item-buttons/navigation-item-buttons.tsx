import { NavigationItemType } from "@/types/navigation-item";

type NavigationItemButtonsProps = {
  item: NavigationItemType;
  handleOpenEditForm: () => void;
  deleteItem: (id: string) => NavigationItemType[];
  createItem: (parentId?: string) => NavigationItemType[];
};

export const NavigationItemButtons = ({
  item,
  createItem,
  deleteItem,
  handleOpenEditForm,
}: NavigationItemButtonsProps) => {
  return (
    <div className="flex border border-gray-300 rounded-md overflow-hidden">
      <button
        onClick={() => deleteItem(item.id)}
        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-200 border-r border-gray-300"
      >
        Usuń
      </button>
      <button
        onClick={handleOpenEditForm}
        className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-200 border-r border-gray-300"
      >
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
