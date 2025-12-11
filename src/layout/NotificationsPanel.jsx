import React from "react";

// Notification dropdown panel. Expects an array of
// { title, message, time } items. Renders positioned container;
// parent controls placement and click-outside behavior.
export default function NotificationsPanel({
    isOpen,
    items = [],
    panelRef,
    className = "",
}) {
    if (!isOpen) return null;

    const list = items.length
        ? items
        : [
            {
                title: "New User Registered",
                message: "John Doe registered to aussiemate 2.0",
                time: "2 mins ago",
            },
            {
                title: "New User Registretded",
                message: "John Doe registered to aussiemate 2.0",
                time: "2 mins ago",
            },
            {
                title: "New User Registreted",
                message: "John Doe registered to aussiemate 2.0",
                time: "2 mins ago",
            },
            {
                title: "New User Registered",
                message: "John Doe registered to aussiemate 2.0",
                time: "2 mins ago",
            },
            {
                title: "New User Registered",
                message: "John Doe registered to aussiemate 2.0",
                time: "2 mins ago",
            },
        ];

    return (
        <div
            ref={panelRef}
            className={`
    fixed left-1/2 -translate-x-1/2 top-16 px-4 /* Add side padding on small screens */
    sm:absolute sm:right-0 sm:left-auto sm:translate-x-0 sm:top-auto sm:mt-3 sm:px-0
    w-[360px] sm:w-[420px]
    max-w-[95vw] sm:max-w-none
    bg-white rounded-2xl shadow-2xl 
    border border-gray-200 
    z-60 max-h-[55vh] overflow-y-auto 
    ${className}
  `}
        >

            <div className="p-4 sm:p-5 flex flex-col gap-6">
                {list.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex items-start justify-between gap-4 pb-2 border-b last:border-b-0 last:pb-0 border-gray-200"
                    >
                        <div>
                            <p className=" font-semibold text-[#0F172A]">{item.title}</p>
                            <p className="text-sm text-[#6B7280] mt-1">{item.message}</p>
                        </div>
                        <span className="text-sm text-[#6B7280] whitespace-nowrap">
                            {item.time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

