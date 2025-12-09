import { Briefcase, Star, MapPin, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const handleViewJobs = () => {
        navigate("/jobs");
    };

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#F9F9F9] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                        <Briefcase size={20} className="text-[#2563EB]" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg font-semibold text-primary">
                            {cleaner?.jobs || 128}
                        </p>
                        <p className="text-sm font-medium text-primary-light">Jobs completed</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#F9F9F9] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                        <Star size={20} className="text-[#2563EB]" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg font-semibold text-primary">
                            {cleaner?.rating || 4.2}
                        </p>
                        <p className="text-sm font-medium text-primary-light">Avg Rating</p>
                    </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#F9F9F9] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#2563EB] font-bold text-lg">$</span>
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg font-semibold">
                            <span className="text-primary">AU${cleaner?.earnings?.toLocaleString() || "12,420"}</span>
                        </p>
                        <p className="text-sm font-medium text-primary-light">Total Earnings</p>
                    </div>
                </div>
            </div>

            {/* Recent Jobs Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-primary text-base md:text-lg">
                        Recent jobs
                    </h3>
                    <button 
                        onClick={handleViewJobs}
                        className="text-sm text-primary font-medium cursor-pointer whitespace-nowrap"
                    >
                        View Jobs
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
                    {recentJobsData.map((job) => {
                        const isInProgress = job.status === "In Progress";
                        return (
                            <div
                                key={job.id}
                                className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 min-w-[200px] shadow-sm"
                            >
                                <div>
                                    <p className="text-primary font-medium whitespace-nowrap mb-1">
                                        {job.type} • {job.subType}
                                    </p>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                            isInProgress
                                                ? "bg-[#FFF8DD] text-[#F6B100] border border-[#F6B10033]"
                                                : "bg-[#EAFFF1] text-[#17C653] border border-[#17C65333]"
                                        }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full inline-block mr-1 ${
                                                isInProgress
                                                    ? "bg-[#F6B100]"
                                                    : "bg-[#17C653]"
                                            }`}
                                        />
                                        {job.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm font-medium text-primary-light">
                                    <MapPin size={12} className="flex-shrink-0" />
                                    <span className="truncate">{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm font-medium text-primary-light">
                                    <Calendar size={12} className="flex-shrink-0" />
                                    <span>{job.date}</span>
                                </div>
                                <div className="pt-2 flex justify-between">
                                    <p className="text-sm font-medium">
                                        <span className="text-[#374151]">Payment: </span>
                                        <span className="text-primary">${job.payment}</span>
                                    </p>
                                    <p className="text-sm font-medium text-[#374151]">
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

