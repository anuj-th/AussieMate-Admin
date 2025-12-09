import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectingStart, setSelectingStart] = useState(true);
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
    return `${month}/${day}/${year}`;
  };

  const formatMonthYear = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month days
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const isDateInRange = (date, start, end) => {
    if (!start || !end) return false;
    const dateTime = date.getTime();
    const startTime = new Date(start).setHours(0, 0, 0, 0);
    const endTime = new Date(end).setHours(0, 0, 0, 0);
    return dateTime >= startTime && dateTime <= endTime;
  };

  const isStartDate = (date, start) => {
    if (!start) return false;
    return new Date(date).setHours(0, 0, 0, 0) === new Date(start).setHours(0, 0, 0, 0);
  };

  const isEndDate = (date, end) => {
    if (!end) return false;
    return new Date(date).setHours(0, 0, 0, 0) === new Date(end).setHours(0, 0, 0, 0);
  };

  const handleDateClick = (date) => {
    if (!customRange.start || (customRange.start && customRange.end) || !selectingStart) {
      // Start new selection
      setCustomRange({ start: date, end: null });
      setSelectingStart(false);
    } else {
      // Complete selection
      if (date < customRange.start) {
        setCustomRange({ start: date, end: customRange.start });
      } else {
        setCustomRange({ ...customRange, end: date });
      }
      setSelectingStart(true);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const getNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    return next;
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

          {/* Custom range calendar (two calendars side-by-side) */}
          {selectedPreset === "Custom" && (
            <div className="border-t border-gray-200 bg-white">
              {/* Calendar Header with Navigation */}
              <div className="flex items-center justify-between px-4 pt-4 pb-2">
                <button
                  type="button"
                  onClick={() => navigateMonth(-1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900">
                    {formatMonthYear(currentMonth)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatMonthYear(getNextMonth())}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigateMonth(1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Two Calendars Side by Side */}
              <div className="grid grid-cols-2 gap-4 px-4 pb-4">
                {/* Left Calendar */}
                <div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-gray-500 text-center py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentMonth).map((dayObj, idx) => {
                      const dayDate = dayObj.date;
                      const isInRange = isDateInRange(
                        dayDate,
                        customRange.start,
                        customRange.end
                      );
                      const isStart = isStartDate(dayDate, customRange.start);
                      const isEnd = isEndDate(dayDate, customRange.end);
                      const isSelected = isStart || isEnd;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dayDate)}
                          className={`text-xs py-2 rounded ${
                            !dayObj.isCurrentMonth
                              ? "text-gray-300"
                              : isSelected
                              ? "bg-[#2563EB] text-white font-semibold"
                              : isInRange
                              ? "bg-[#EBF2FD] text-[#2563EB]"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {dayDate.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Calendar */}
                <div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                      <div
                        key={day}
                        className="text-xs font-medium text-gray-500 text-center py-1"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(getNextMonth()).map((dayObj, idx) => {
                      const dayDate = dayObj.date;
                      const isInRange = isDateInRange(
                        dayDate,
                        customRange.start,
                        customRange.end
                      );
                      const isStart = isStartDate(dayDate, customRange.start);
                      const isEnd = isEndDate(dayDate, customRange.end);
                      const isSelected = isStart || isEnd;

                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleDateClick(dayDate)}
                          className={`text-xs py-2 rounded ${
                            !dayObj.isCurrentMonth
                              ? "text-gray-300"
                              : isSelected
                              ? "bg-[#2563EB] text-white font-semibold"
                              : isInRange
                              ? "bg-[#EBF2FD] text-[#2563EB]"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {dayDate.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer with Date Range and Buttons */}
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {customRange.start && customRange.end
                    ? `${formatDate(customRange.start)} - ${formatDate(customRange.end)}`
                    : "Select date range"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyCustom}
                    disabled={!customRange.start || !customRange.end}
                    className="px-4 py-1.5 rounded-lg text-sm font-medium bg-[#2563EB] text-white hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

