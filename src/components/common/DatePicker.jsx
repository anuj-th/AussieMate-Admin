import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";

export default function DatePicker({
  label = "Date Joined",
  value,
  onChange,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("Today"); // 'Today' | 'Last 7 days' | 'Custom'
  const [customRange, setCustomRange] = useState(() => {
    // value can optionally be an object { preset, start, end }
    if (value && value.start && value.end) {
      return { start: value.start, end: value.end };
    }
    return { start: null, end: null };
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);

    const today = new Date();
    if (preset === "Today") {
      const payload = { preset: "Today", start: today, end: today };
      onChange?.(payload);
      setIsOpen(false);
      return;
    }

    if (preset === "Last 7 days") {
      const end = today;
      const start = new Date();
      start.setDate(end.getDate() - 6);
      const payload = { preset: "Last 7 days", start, end };
      onChange?.(payload);
      setIsOpen(false);
      return;
    }

    // Custom – keep dropdown open and show range picker
    if (preset === "Custom") {
      setCustomRange((prev) => ({
        start: prev.start || today,
        end: prev.end || today,
      }));
    }
  };

  const handleApplyCustom = () => {
    if (!customRange.start || !customRange.end) return;
    const payload = {
      preset: "Custom",
      start: customRange.start,
      end: customRange.end,
    };
    onChange?.(payload);
    setIsOpen(false);
  };

  const displayLabel = () => {
    if (!value) return label;
    if (value.preset === "Today" || value.preset === "Last 7 days") {
      return value.preset;
    }
    if (value.start && value.end) {
      return `${formatDate(value.start)} - ${formatDate(value.end)}`;
    }
    return label;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-3.5 py-1.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB33] focus:border-[#2563EB] cursor-pointer gap-2"
      >
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-gray-400" />
          <span className={value ? "text-[#111827]" : "text-gray-400"}>
            {displayLabel()}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 right-0 w-full min-w-[260px] max-w-xs rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          {/* Preset list */}
          <div className="max-h-48 overflow-auto">
            {["Today", "Last 7 days", "Custom"].map((preset) => {
              const isSelected = selectedPreset === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetSelect(preset)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-[#EBF2FD] text-[#2563EB] font-medium"
                      : "text-[#111827] hover:bg-gray-50"
                  }`}
                >
                  <span>{preset}</span>
                  {isSelected && (
                    <span className="text-[#2563EB] text-base leading-none">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom range calendar (simple date inputs) */}
          {selectedPreset === "Custom" && (
            <div className="border-t border-gray-200 px-4 pb-4 pt-3 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    Start date
                  </label>
                  <input
                    type="date"
                    value={
                      customRange.start
                        ? new Date(customRange.start)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const date = e.target.value
                        ? new Date(e.target.value)
                        : null;
                      setCustomRange((prev) => ({ ...prev, start: date }));
                    }}
                    className="w-full px-1.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    End date
                  </label>
                  <input
                    type="date"
                    value={
                      customRange.end
                        ? new Date(customRange.end).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const date = e.target.value
                        ? new Date(e.target.value)
                        : null;
                      setCustomRange((prev) => ({ ...prev, end: date }));
                    }}
                    className="w-full px-1.5 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyCustom}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

