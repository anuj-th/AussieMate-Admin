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
  const [showCalendar, setShowCalendar] = useState(null); // null | 'from' | 'to'
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
    // dd/mm/yyyy
    return `${day}/${month}/${year}`;
  };

  // Compact display format (no year) for UI chips/inputs
  const formatDisplayDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    // dd/mm (no year)
    return `${day}/${month}`;
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

  const isDateDisabled = (date, start) => {
    if (!start) return false;
    const dateTime = new Date(date).setHours(0, 0, 0, 0);
    const startTime = new Date(start).setHours(0, 0, 0, 0);
    return dateTime < startTime;
  };

  const handleDateClick = (date) => {
    if (showCalendar === 'from') {
      setCustomRange({ ...customRange, start: date });
      setShowCalendar(null);
    } else if (showCalendar === 'to') {
      // Only allow dates on or after the start date
      if (customRange.start && date < customRange.start) {
        return; // Don't allow selection if before start date
      }
      setCustomRange({ ...customRange, end: date });
      setShowCalendar(null);
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

    // Custom – keep dropdown open and show From/To inputs
    if (preset === "Custom") {
      setShowCalendar(null); // Reset calendar view
      setCustomRange((prev) => ({
        start: prev.start || null,
        end: prev.end || null,
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
      const startStr = formatDisplayDate(value.start);
      const endStr = formatDisplayDate(value.end);
      return `${startStr} - ${endStr}`;
    }
    return label;
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between rounded-lg px-3.5 py-1.5 text-xs md:text-sm focus:border-[#2563EB] cursor-pointer gap-2 ${
          value ? "bg-[#EFF6FF] border border-[#1B84FF33]" : "bg-white border border-[#D0D5DD]"
        }`}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-gray-400" />
          <span className={`${value ? "text-[#1F6FEB] font-medium" : "text-gray-400"} flex items-center gap-1 whitespace-nowrap`}>
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
                      ? "bg-[#EFF6FF] border border-[#1B84FF33] text-[#1F6FEB] font-medium"
                      : "text-[#111827] hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <span>{preset}</span>
                  {isSelected && (
                    <span className="text-[#1F6FEB] text-base leading-none">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Custom range - From/To inputs or Calendar */}
          {selectedPreset === "Custom" && (
            <div className="border-t border-gray-200 bg-white">
              {!showCalendar ? (
                <>
                  {/* From/To Input Fields */}
                  <div className="px-4 py-3 flex items-end gap-3">
                    {/* From Date */}
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        From
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCalendar('from');
                          // Set calendar to show the start date month if available
                          if (customRange.start) {
                            setCurrentMonth(new Date(customRange.start.getFullYear(), customRange.start.getMonth(), 1));
                          }
                        }}
                        className="w-full flex !gap-1 items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-1 py-2 text-sm text-left cursor-pointer hover:bg-gray-50"
                      >
                        <span className={customRange.start ? "text-[#111827]" : "text-gray-400"}>
                          {customRange.start ? formatDate(customRange.start) : "dd/mm/yyyy"}
                        </span>
                        <CalendarIcon size={16} className="text-gray-400" />
                      </button>
                    </div>

                    {/* To Date */}
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        To
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCalendar('to');
                          // Set calendar to show the end date month if available, otherwise start date month
                          if (customRange.end) {
                            setCurrentMonth(new Date(customRange.end.getFullYear(), customRange.end.getMonth(), 1));
                          } else if (customRange.start) {
                            setCurrentMonth(new Date(customRange.start.getFullYear(), customRange.start.getMonth(), 1));
                          }
                        }}
                        className="w-full flex gap-1 items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-1 py-2 text-sm text-left cursor-pointer hover:bg-gray-50"
                      >
                        <span className={customRange.end ? "text-[#111827]" : "text-gray-400"}>
                          {customRange.end ? formatDate(customRange.end) : "dd/mm/yyyy"}
                        </span>
                        <CalendarIcon size={16} className="text-gray-400" />
                      </button>
                    </div>
                  </div>

                  {/* Footer with Buttons */}
                  <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 flex items-center justify-end gap-2">
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
                </>
              ) : (
                <>
                  {/* Single Calendar for From/To Selection */}
                  <div className="px-4 py-3">
                    {/* Calendar Header with Navigation */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={() => navigateMonth(-1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronLeft size={20} className="text-gray-600" />
                      </button>
                      <span className="text-sm font-medium text-gray-900">
                        {formatMonthYear(currentMonth)}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigateMonth(1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ChevronRight size={20} className="text-gray-600" />
                      </button>
                    </div>

                    {/* Calendar Grid */}
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
                          const isDisabled = showCalendar === 'to' && isDateDisabled(dayDate, customRange.start);

                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleDateClick(dayDate)}
                              disabled={isDisabled}
                              className={`text-xs py-2 rounded ${
                                !dayObj.isCurrentMonth
                                  ? "text-gray-300"
                                  : isDisabled
                                  ? "text-gray-300 cursor-not-allowed opacity-50"
                                  : isSelected
                                  ? "bg-[#EFF6FF] border border-[#1B84FF33] text-[#1F6FEB] font-semibold"
                                  : isInRange
                                  ? "bg-[#EBF2FD] text-[#1F6FEB]"
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

                  {/* Back Button */}
                  <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(null)}
                      className="w-full px-4 py-1.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                    >
                      Back
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

