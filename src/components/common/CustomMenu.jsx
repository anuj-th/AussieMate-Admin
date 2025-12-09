import React, { useState, useEffect, useRef } from "react";

/**
 * Lightweight dropdown menu with a clickable trigger (3 dots by default).
 *
 * Props:
 * - trigger?: ReactNode – custom trigger; if not provided, renders a 3‑dot icon button
 * - items: Array<{
 *     id?: string | number;
 *     label: string | ReactNode;
 *     icon?: ReactNode;
 *     description?: string | ReactNode;
 *     onClick?: () => void;
 *     danger?: boolean;
 *     disabled?: boolean;
 *   }>
 * - align?: "left" | "right" – horizontal alignment of the menu relative to trigger (default: "right")
 * - title?: string | ReactNode – optional small label above items (e.g. "Menu")
 * - className?: string – extra classes for the popover container
 */

export default function  CustomMenu({
  trigger,
  items = [],
  align = "right",
  title,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClick = (event) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target)) {
        close();
      }
    };

    const handleKey = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const alignmentClass =
    align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right";

  const handleItemClick = (item) => {
    if (item.disabled) return;
    item.onClick?.();
    close();
  };

  const DefaultTrigger = () => (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full cursor-pointer "
      aria-haspopup="menu"
      aria-expanded={open}
    >
      <span className="flex flex-col gap-[3px]">
        <span className="w-1 h-1 rounded-full bg-black" />
        <span className="w-1 h-1 rounded-full bg-black" />
        <span className="w-1 h-1 rounded-full bg-black" />
      </span>
    </button>
  );

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {trigger ? (
        React.cloneElement(trigger, {
          onClick: (e) => {
            e.stopPropagation();
            trigger.props?.onClick?.(e);
            toggle();
          },
        })
      ) : (
        <DefaultTrigger />
      )}

      {open && (
        <div
          className={`absolute z-40 mt-2 px-2 min-w-[220px] rounded-2xl bg-white shadow-lg border border-[#E5E7EB] ${alignmentClass} ${className}`}
        >
          <div className="py-2">
            {title && (
              <div className="px-4 pb-1 text-[12px] uppercase tracking-wide text-[#9CA3AF]">
                {title}
              </div>
            )}

             <div className="flex flex-col gap-0.5">
               {items.map((item, index) => {
                const key = item.id ?? index;
                const isDanger = item.danger;
                const baseColor = isDanger
                  ? "text-[#F04438]"
                  : "text-[#111827]";
                const descriptionColor = isDanger
                  ? "text-[#FB7185] "
                  : "text-[#6B7280]";

                 const dividerClasses = item.divider
                   ? "border-t-[0.6px] border-[#E5E7EB] pt-2 mt-1"
                   : "";

                 return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleItemClick(item)}
                     disabled={item.disabled}
                     className={`flex w-full items-center gap-1 px-4 py-2 text-left text-sm ${dividerClasses} ${
                      item.disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#F3F4F6] rounded-lg"
                    }`}
                  >
                    {item.icon && (
                      <span className="flex h-8 w-8 items-center justify-center">
                        {item.icon}
                      </span>
                    )}
                    <div className="flex flex-col">
                      <span className={`text-[13px] font-medium ${baseColor}`}>
                        {item.label}
                      </span>
                      {item.description && (
                        <span
                          className={`mt-0.5 text-[11px] ${descriptionColor}`}
                        >
                          {item.description}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


