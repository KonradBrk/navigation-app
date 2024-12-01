import { useForm } from "react-hook-form";
import * as z from "zod";
import { TextInput } from "@/forms/fields";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { NavigationItemType } from "@/types/navigation-item";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url("Link musi być poprawnym URL"),
});

type NavigationItemFormData = z.infer<typeof schema>;

type NavigationItemFormProps = {
  parentId?: string;
  item: NavigationItemType;
  updateItem: (updatedItem: NavigationItemType) => NavigationItemType[];
  deleteItem: (id: string) => NavigationItemType[];
};

export const NavigationItemForm = ({
  updateItem,
  deleteItem,
  item,
}: NavigationItemFormProps) => {
  const { control, handleSubmit } = useForm<NavigationItemFormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      id: item?.id ?? "",
      name: item?.name ?? "",
      url: item?.url ?? "",
    },
  });

  const onSubmit = (data: NavigationItemFormData) => {
    updateItem(data as NavigationItemType);
  };

  return (
    <div className="flex bg-white relative flex-col items-center justify-center w-full h-64 border border-gray-300 rounded-md p-6">
      <div className="absolute top-6 right-6 cursor-pointer">
        <Image
          onClick={() => deleteItem(item.id)}
          src="/delete.svg"
          alt=""
          width={20}
          height={20}
          priority
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col gap-2 flex w-full pr-11"
      >
        <TextInput
          id="name"
          label="Nazwa"
          placeholder="np. Promocje"
          control={control}
          name="name"
        />

        <TextInput
          id="link"
          label="Link"
          icon={
            <Image src="/search.svg" alt="" width={20} height={20} priority />
          }
          placeholder="Wklej lub wyszukaj"
          control={control}
          name="url"
        />

        <div className="flex gap-2 mt-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="px-4 py-2  bg-white border text-primary-500 border-primary-500 rounded-md shadow-sm hover:bg-primary-100 focus:outline-none focus:ring focus:ring-blue-300 font-semibold"
          >
            Dodaj
          </button>
        </div>
      </form>
    </div>
  );
};
