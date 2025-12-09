import { Search } from "lucide-react";

export default function SearchInput({
  placeholder = "Search",
  onChange,
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        className="pl-9 pr-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full bg-[#FCFCFC]"
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
}
