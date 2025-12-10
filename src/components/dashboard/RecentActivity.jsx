import Toggle from "../common/Toggle";
import uploadCircle from "../../assets/icon/uploadCircle.svg";
import memberCircle from "../../assets/icon/memberCircle.svg";
import dollerCircle from "../../assets/icon/dollerCircle.svg";
import contactCircle from "../../assets/icon/contactCircle.svg";

const defaultActivities = [
  {
    id: 1,
    title: "Reema P uploaded Police Check",
    meta: "2025-09-19 09:12",
    icon: uploadCircle,
  },
  {
    id: 2,
    title: "Job AM-20250919-001 created in Parramatta",
    meta: "2025-09-19 08:40",
    icon: memberCircle,
  },
  {
    id: 3,
    title: "Escrow AU$320 received from Selina K",
    meta: "5 days ago, 4:07 PM",
    icon: dollerCircle,
  },
  {
    id: 4,
    title: "Dispute D-20250915-004 opened by Meera S",
    meta: "2025-09-15 12:10",
    icon: contactCircle,
  },
];

export default function RecentActivity({
  title = "Recent Activity",
  autoRefresh = true,
  onAutoRefreshChange,
  activities = defaultActivities,
}) {
  return (
    <div className="bg-white rounded-[16px] border border-[#EEF0F5] shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between px-7 py-4 border-b border-[#EEF0F5] pb-3">
        <h2 className="font-semibold text-primary">
          {title}
        </h2>
        <div className="flex items-center gap-2 text-sm font-medium text-[#4B5675]">
          <span >Auto refresh: {autoRefresh ? "on" : "off"}</span>
          <div className="pl-2">
            <Toggle
              checked={autoRefresh}
              onChange={onAutoRefreshChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 px-7 py-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex items-start gap-4 space-y-4">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className=" rounded-full flex items-center justify-center">
                {activity.icon ? (
                  <img 
                    src={activity.icon} 
                    alt="" 
                    className="w-8 h-8"
                  />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-[#6563C1]" />
                )}
              </div>
              {index !== activities.length - 1 && (
                <div className="flex-1 w-px bg-[#E6ECF7] mt-1" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1C1C1C]">
                {activity.title}
              </p>
              <p className="text-[12px] text-[#7E7E87] mt-1">
                {activity.meta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
