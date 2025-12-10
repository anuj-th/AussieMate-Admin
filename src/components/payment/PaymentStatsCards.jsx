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
    <div className="bg-white rounded-lg border border-gray shadow-sm p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-0 md:gap-6 items-center justify-center">
        {items.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex-1 flex flex-col items-center justify-center w-full md:w-auto py-3 md:py-0 ${
              index < items.length - 1
                ? "border-b md:border-b-0 md:border-r border-gray-200 md:border-gray-200 mb-0 md:mb-0 md:pr-4 md:pr-6"
                : ""
            }`}
          >
            <span className="text-lg md:text-xl lg:text-2xl font-semibold text-[#1C1C1C] leading-tight text-center">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs lg:text-sm font-medium text-primary-light mt-1 text-center">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

