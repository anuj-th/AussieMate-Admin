import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  fullWidth = false,
  onClick, 
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  ...props 
}) => {
  // Base classes
  const baseClasses = 'font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none cursor-pointer';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-[#1F6FEB] hover:bg-[#1B63D6] text-white text-[13px]',
    secondary: 'bg-white border border-[#9CC0F6] text-primary-600 shadow-custom',
    outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 ',
    ghost: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    danger: 'bg-[#EF4444] hover:bg-[#DC2626] text-white text-[13px]',
    success: 'bg-green-500 hover:text-[#00832D] text-green-500',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white ',
    link: 'bg-transparent text-primary-600 hover:underline  p-0'
  };
  
  // Size classes (padding only, text size handled by variant or conditionally)
  const sizeClasses = {
    xs: 'px-2 py-1',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-3',
    xl: 'px-8 py-3'
  };
  
  // Text size classes (for non-primary/danger variants)
  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };
  
  // Use 13px for primary/danger variants, otherwise use size-based text
  const textSizeClass = (variant === 'primary' || variant === 'danger') 
    ? '' 
    : textSizeClasses[size] || '';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${textSizeClass}
    ${widthClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );
  
  // Render icon
  const renderIcon = () => {
    if (loading) return <LoadingSpinner />;
    if (icon) {
      if (typeof icon === 'string') {
        return <img src={icon} alt="" className="w-4 h-4" />;
      }
      return icon;
    }
    return null;
  };
  
  // Render content
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          Loading...
        </>
      );
    }
    
    if (icon && iconPosition === 'left') {
      return (
        <>
          {renderIcon()}
          {children}
        </>
      );
    }
    
    if (icon && iconPosition === 'right') {
      return (
        <>
          {children}
          {renderIcon()}
        </>
      );
    }
    
    return children;
  };
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;
