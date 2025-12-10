import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomSelect = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select...',
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  optionClassName = '',
  itemPadding = '',
  showSelectedHeader = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Normalize options - handle both string arrays and object arrays
  const normalizedOptions = options.map((opt) => 
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  const handleSelect = (optionValue) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-1.5 text-sm focus:border-[#2563EB] focus:outline-none cursor-pointer gap-2 ${buttonClassName}`}
      >
        <span
          className={`${
            value ? 'text-[#111827]' : 'text-gray-400'
          } whitespace-nowrap truncate`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className={`absolute z-50 mt-2 min-w-full w-max rounded-xl border border-[#E5E7EB] bg-white shadow-lg max-h-60 overflow-auto ${dropdownClassName}`}>
          {showSelectedHeader && selectedOption && (
            <div className="flex items-center justify-between px-4 py-2 bg-[#EBF2FD] text-[#2563EB] font-semibold border-b border-[#E5E7EB]">
              <span className="whitespace-nowrap">{selectedOption.label}</span>
              <ChevronDown className="h-4 w-4 text-[#2563EB]" />
            </div>
          )}
          <div className={optionClassName || "p-2"}>
            {normalizedOptions.map((option) => {
              const isSelected = value === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between ${itemPadding || (optionClassName ? 'px-3 py-2' : 'px-4 py-3')} rounded-lg text-xs transition-colors cursor-pointer mb-1 last:mb-0 ${
                    isSelected
                      ? 'bg-[#EBF2FD] text-[#2563EB] font-semibold'
                      : 'text-[#111827] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <span className="whitespace-nowrap">
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check className="h-4 w-4 text-[#2563EB] flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
