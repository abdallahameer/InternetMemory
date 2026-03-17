"use client";

import { useState, useEffect } from "react";

interface Option {
  id: string;
  name: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  placeholder?: string;
  onChange: (selectedOption: Option | null) => void;
  required?: boolean;
  defaultValue?: string;
}

export default function SelectInput({
  label,
  options,
  placeholder = "Select an option...",
  onChange,
  required = false,
  defaultValue = "",
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  useEffect(() => {
    if (defaultValue) {
      const found = options.find((opt) => opt.name === defaultValue);
      if (found) {
        setSelectedOption(found);
      }
    } else {
      setSelectedOption(null);
    }
  }, [defaultValue, options]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedOption(null);
    onChange(null);
  };

  return (
    <div className="flex flex-col gap-1 max-h-[500px]">
      <label className="text-xs font-semibold text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full border rounded-lg px-4 py-3 text-sm text-left outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
            isOpen
              ? "bg-white text-black ring-2 ring-purple-500"
              : "bg-black text-gray-300"
          }`}
        >
          {selectedOption ? selectedOption.name : placeholder}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 border rounded-lg bg-black text-gray-300 z-10 max-h-96 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500">
                No options available
              </div>
            ) : (
              options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="w-full px-4 py-3 text-sm text-left hover:bg-[#0F0F0F] hover:text-gray-200 transition-colors"
                >
                  {option.name}
                </button>
              ))
            )}
          </div>
        )}
      </div>
      {selectedOption && (
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-gray-400 hover:text-gray-300"
        >
          Clear selection
        </button>
      )}
    </div>
  );
}
