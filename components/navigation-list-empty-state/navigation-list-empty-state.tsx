"use client";

import Image from "next/image";

type NavigationListEmptyStateProps = {
  onClick: () => void;
};

export const NavigationListEmptyState = ({
  onClick,
}: NavigationListEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-50 border border-gray-300 rounded-md p-6">
      <p className="text-lg font-semibold text-gray-800">Menu jest puste</p>
      <p className="text-sm text-gray-600">
        W tym menu nie ma jeszcze żadnych linków.
      </p>
      <button
        className="flex items-center gap-2 mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition"
        onClick={onClick}
      >
        <Image src="/add.svg" alt="" width={20} height={20} priority />
        Dodaj pozycję menu
      </button>
    </div>
  );
};
