import { HTMLInputTypeAttribute } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type TextInputProps<T extends FieldValues> = UseControllerProps<T> & {
  id: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
};

export const TextInput = <T extends FieldValues>({
  id,
  label,
  placeholder,
  icon,
  type = "text",
  ...rest
}: TextInputProps<T>) => {
  const { field, fieldState } = useController(rest);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1.5 w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={type}
          {...field}
          value={field.value || ""}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`block w-full p-2 rounded-md border ${
            fieldState.error ? "border-red-500" : "border-gray-300"
          } ${icon ? "pl-10" : "pl-2"}`}
        />
      </div>
      {fieldState.error && (
        <span className="text-red-500 text-sm">{fieldState.error.message}</span>
      )}
    </div>
  );
};
