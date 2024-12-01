type NavigationListAddButtonProps = {
  onClick: () => void;
};

export const NavigationListAddButton = ({
  onClick,
}: NavigationListAddButtonProps) => {
  return (
    <div className="p-4 bg-gray-100 border-t border-gray-200 rounded-b-md">
      <button
        onClick={onClick}
        className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-200"
      >
        Dodaj pozycję menu
      </button>
    </div>
  );
};
