import React from 'react';

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  name,
  id,
  required = false,
  disabled = false,
  error = false,
  errorMessage = '',
  className = '',
  labelClassName = '',
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id || name}
          className={`block text-sm font-semibold text-gray-900 mb-2 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 rounded-lg
          border ${error ? 'border-red-500' : 'border-gray-300'}
          bg-white
          text-gray-900
          placeholder:text-gray-400
          focus:outline-none
          focus:ring-1
          ${error ? 'focus:ring-red-500 focus:border-red-500' : 'focus:ring-blue-500 focus:border-blue-500'}
          disabled:bg-gray-100
          disabled:cursor-not-allowed
          disabled:text-gray-500
          transition-all duration-200
        `}
        {...props}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;

