import React, { useId, forwardRef } from "react";
import checkboxIcon from "../../assets/icon/checkbox.svg";
 
const Checkbox = forwardRef(
  (
    {
      id,
      name,
      label,
      checked = false,
      onChange,
      className = "",
      checkboxSize = "w-4 h-4",
      labelClassName = "text-sm text-[#374151] font-medium",
      required = false,
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = id || `checkbox-${name || autoId}`;
 
    return (
      <div className={`flex items-start gap-2 ${className}`}>
        <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            id={inputId}
            name={name}
            checked={checked}
            onChange={onChange}
            required={required}
            className="sr-only peer"
            ref={ref}            
          />
          <label
            htmlFor={inputId}
            className={`${checkboxSize} border border-gray-300 rounded cursor-pointer flex items-center justify-center transition-all peer-checked:bg-[#6563C1] peer-checked:border-[#6563C1]`}
          >
            {checked && (
              <img src={checkboxIcon} alt="checked" className="w-4 h-4" />
            )}
          </label>
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className={`cursor-pointer ${labelClassName}`}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
 
export default Checkbox;
 
 