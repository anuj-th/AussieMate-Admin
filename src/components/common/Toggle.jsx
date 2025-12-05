export default function Toggle({ checked, onChange, className = "" }) {
  const handleClick = () => {
    onChange(!checked);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`toggle-switch relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none cursor-pointer transition-colors duration-200 ${checked ? 'bg-[#2563EB]' : 'bg-gray-300'
        } ${className}`}
    >
      <span
        className={`toggle-switch-circle inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? 'translate-x-5.5' : 'translate-x-0.5'
          }`}
      />
    </button>
  );
}