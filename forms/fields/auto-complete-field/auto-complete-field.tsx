import { HTMLInputTypeAttribute } from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import { useState } from "react";

type AutoCompleteInputProps<T extends FieldValues> = UseControllerProps<T> & {
  id: string;
  label: string;
  placeholder?: string;
  options: string[];
  icon?: React.ReactNode;
  type?: HTMLInputTypeAttribute;
};

export const AutoCompleteInput = <T extends FieldValues>({
  id,
  label,
  placeholder,
  options,
  icon,
  type = "text",
  ...rest
}: AutoCompleteInputProps<T>) => {
  const { field, fieldState } = useController(rest);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    field.onChange(inputValue);

    const matchingOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(matchingOptions);
    setShowDropdown(true);
  };

  const handleOptionSelect = (option: string) => {
    field.onChange(option);
    setShowDropdown(false);
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
          autoComplete="off"
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`block w-full p-2 rounded-md border ${
            fieldState.error ? "border-red-500" : "border-gray-300"
          } ${icon ? "pl-10" : "pl-2"}`}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Delay to handle option click
        />
        {showDropdown && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60">
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionSelect(option)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-2 text-sm text-gray-500">
                Brak dostępnych opcji
              </li>
            )}
          </ul>
        )}
      </div>
      {fieldState.error && (
        <span className="text-red-500 text-sm">{fieldState.error.message}</span>
      )}
    </div>
  );
};
