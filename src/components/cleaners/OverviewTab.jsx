import { Briefcase, Star, MapPin, Calendar } from "lucide-react";

const recentJobsData = [
    {
        id: 1,
        type: "Pet Sitting",
        subType: "Walking",
        status: "Completed",
        location: "860, Hutt Street, South Australia",
        date: "23 Aug, 2025",
        payment: 80,
        releasedDate: "Released Aug 27",
    },
    {
        id: 2,
        type: "Pet Sitting",
        subType: "Feeding",
        status: "In Progress",
        location: "795, Market Street, Fremantle Prison...",
        date: "24 Aug, 2025",
        payment: 120,
        releasedDate: "Released Aug 27",
    },
    {
        id: 3,
        type: "Pet Sitting",
        subType: "Boarding",
        status: "Completed",
        location: "375, Domain Road, Royal Botanic Gard...",
        date: "25 Aug, 2025",
        payment: 80,
        releasedDate: "Released Aug 27",
    },
    {
        id: 4,
        type: "Pet Sitting",
        subType: "Walking",
        status: "Completed",
        location: "720, Roe Stre",
        date: "26 Aug, 2025",
        payment: 80,
        releasedDate: "Released Aug 27",
    },
];

export default function OverviewTab({ cleaner }) {
    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] flex items-center justify-center flex-shrink-0">
                        <Briefcase size={20} className="text-[#2563EB]" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-[#78829D]">Jobs completed</p>
                        <p className="text-lg font-semibold text-primary">
                            {cleaner?.jobs || 128}
                        </p>
                    </div>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] flex items-center justify-center flex-shrink-0">
                        <Star size={20} className="text-[#2563EB]" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-[#78829D]">Avg Rating</p>
                        <p className="text-lg font-semibold text-primary">
                            {cleaner?.rating || 4.2}
                        </p>
                    </div>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#2563EB] font-bold text-lg">$</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs text-[#78829D]">Total Earnings</p>
                        <p className="text-lg font-semibold text-primary">
                            AU${cleaner?.earnings?.toLocaleString() || "12,420"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Jobs Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-primary text-base md:text-lg">
                        Recent jobs
                    </h3>
                    <button className="text-sm text-[#2563EB] hover:underline whitespace-nowrap">
                        View Jobs
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
                    {recentJobsData.map((job) => {
                        const isInProgress = job.status === "In Progress";
                        return (
                            <div
                                key={job.id}
                                className="bg-white border border-[#E5E7EB] rounded-lg p-4 space-y-2 min-w-[200px]"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-[#78829D] whitespace-nowrap">
                                        {job.type} • {job.subType}
                                    </span>
                                    <span
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${
                                            isInProgress
                                                ? "bg-[#FFF8DD] text-[#F6B100] border border-[#F6B10033]"
                                                : "bg-[#EAFFF1] text-[#17C653] border border-[#17C65333]"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${
                                                isInProgress
                                                    ? "bg-[#F6B100]"
                                                    : "bg-[#17C653]"
                                            }`}
                                        />
                                        {job.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[#78829D]">
                                    <MapPin size={12} className="flex-shrink-0" />
                                    <span className="truncate">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-[#78829D]">
                                    <Calendar size={12} className="flex-shrink-0" />
                                    <span>{job.date}</span>
                                </div>
                                <div className="pt-2 border-t border-[#E5E7EB]">
                                    <p className="text-xs text-primary font-medium">
                                        Payment: ${job.payment}
                                    </p>
                                    <p className="text-[10px] text-[#78829D]">
                                        {job.releasedDate}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

