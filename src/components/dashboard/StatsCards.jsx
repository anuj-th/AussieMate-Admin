import dashKYC from "../../assets/icon/dashKYC.svg";
import dashJobs from "../../assets/icon/dashJobs.svg";
import dashHeld from "../../assets/icon/dashHeld.svg";
import dashRevenue from "../../assets/icon/dashRevenue.svg";

const cards = [
  {
    id: 1,
    label: "Pending KYC",
    value: 34,
    icon: dashKYC,
  },
  {
    id: 2,
    label: "Total Jobs",
    value: 453,
    icon: dashJobs,
  },
  {
    id: 3,
    label: "Escrow Held",
    value: "$5,420",
    icon: dashHeld,
  },
  {
    id: 4,
    label: "Revenue (MTD)",
    value: "$18,640",
    icon: dashRevenue,
  },
];

export default function StatsCards({ items = cards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
      {items.map((card) => (
        <div
          key={card.id}
          className="flex items-center gap-4 bg-white rounded-[20px] px-6 py-4 shadow-sm border border-[#EEF0F5]"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl">
            <img
              src={card.icon}
              alt={card.label}
              className="w-14 h-14"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold text-[#1C1C1C] leading-tight">
              {card.value}
            </span>
            <span className="text-xs font-medium text-[#7E7E87] mt-1">
              {card.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}


