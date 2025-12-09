const stats = [
  {
    id: 1,
    label: "Total Held in Escrow",
    value: "AU$5,420",
  },
  {
    id: 2,
    label: "Pending Releases",
    value: "AU$1,720",
  },
  {
    id: 3,
    label: "Released Last 30d",
    value: "AU$24,400",
  },
  {
    id: 4,
    label: "Platform Commission (MTD)",
    value: "AU$18,640",
  },
];

export default function PaymentStatsCards({ items = stats }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 md:p-6">
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        {items.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex-1 flex flex-col ${
              index < items.length - 1
                ? "border-r border-gray-200 pr-4 md:pr-6"
                : ""
            }`}
          >
            <span className="text-xl md:text-2xl font-semibold text-[#1C1C1C] leading-tight">
              {stat.value}
            </span>
            <span className="text-xs md:text-sm font-medium text-[#7E7E87] mt-1">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

