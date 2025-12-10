import { Briefcase, CheckCircle, Star, DollarSign, MapPin, Calendar } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const recentJobsData = [
  {
    id: 1,
    jobId: "AM10432",
    service: "Cleaning • Bond Cleaning",
    price: 320,
    status: "Completed",
    location: "355, Swan Street, Richmond Station",
    date: "23 Aug, 2:00 PM",
  },
  {
    id: 2,
    jobId: "AM10432",
    service: "Housekeeping",
    price: 220,
    status: "Completed",
    location: "360, Toorak Road, The Como Melbourne",
    date: "23 Aug, 2:00 PM",
  },
  {
    id: 3,
    jobId: "AM10432",
    service: "Handyman",
    price: 150,
    status: "Completed",
    location: "660, Anzac Parade, University of New South Wales",
    date: "23 Aug, 2:00 PM",
  },
  {
    id: 4,
    jobId: "AM10433",
    service: "Cleaning • Deep Clean",
    price: 280,
    status: "Completed",
    location: "120, Collins Street, Melbourne CBD",
    date: "22 Aug, 10:00 AM",
  },
];

export default function OverviewTab({ customer, onViewJobs }) {
  const handleViewJobs = () => {
    if (onViewJobs) {
      onViewJobs();
    }
  };

  // Calculate stats from customer data
  const jobsPosted = customer?.jobsPosted || 22;
  const jobsCompleted = customer?.jobsCompleted || 22;
  const avgCleanerRating = customer?.avgCleanerRating || 4.3;
  const totalSpend = customer?.spend 
    ? parseFloat(customer.spend.replace(/,/g, "")) 
    : 12420;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Jobs Posted */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
            <Briefcase size={20} className="text-[#2563EB]" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-primary">
              {jobsPosted}
            </p>
            <p className="text-sm font-medium text-primary-light">Jobs posted</p>
          </div>
        </div>

        {/* Jobs Completed */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
            <CheckCircle size={20} className="text-[#2563EB]" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-primary">
              {jobsCompleted}
            </p>
            <p className="text-sm font-medium text-primary-light">Jobs completed</p>
          </div>
        </div>

        {/* Avg Cleaner Rating */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
            <Star size={20} className="text-[#2563EB]" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-primary">
              {avgCleanerRating}
            </p>
            <p className="text-sm font-medium text-primary-light">Avg Cleaner Rating</p>
          </div>
        </div>

        {/* Total Spend */}
        <div className="bg-white border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
            <DollarSign size={20} className="text-[#2563EB]" />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-semibold text-primary">
              AU${totalSpend.toLocaleString()}
            </p>
            <p className="text-sm font-medium text-primary-light">Total Spend</p>
          </div>
        </div>
      </div>

      {/* Recent Jobs Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-primary text-base md:text-base">
            Recent jobs
          </h3>
          <button
            onClick={handleViewJobs}
            className="text-sm text-primary font-medium cursor-pointer whitespace-nowrap hover:underline"
          >
            View Jobs
          </button>
        </div>
        <div className="overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={16}
            slidesPerView="auto"
            autoplay={{ delay: 2800, disableOnInteraction: false }}
            loop={true}
            className="!overflow-hidden !flex"
            style={{ display: "flex", alignItems: "stretch", paddingBottom: "8px" }}
          >
            {recentJobsData.map((job) => {
              const isCompleted = job.status === "Completed";
              return (
                <SwiperSlide
                  key={job.id}
                  className="h-full flex"
                  style={{ width: "auto", height: "100%", display: "flex" }}
                >
                   <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 md:min-w-[350px] h-full min-h-full shadow-sm flex flex-col cursor-pointer">
                    {/* Top row: Job ID and Status */}
                    <div className="flex items-start justify-between mb-0">
                      <p className="text-sm text-primary-light font-medium">
                        {job.jobId}
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center gap-1 ${
                          isCompleted
                            ? "bg-[#EAFFF1] text-[#17C653] border border-[#17C65333]"
                            : "bg-[#FFF8DD] text-[#F6B100] border border-[#F6B10033]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isCompleted ? "bg-[#17C653]" : "bg-[#F6B100]"
                          }`}
                        />
                        {job.status}
                      </span>
                    </div>
                    
                    {/* Service Type */}
                    <p className="text-sm font-medium text-primary mb-0">
                      {job.service}
                    </p>
                    
                    {/* Price */}
                    <p className="text-base font-semibold text-primary mb-2">
                      AU${job.price}
                    </p>
                    
                    {/* Location */}
                    <div className="flex items-start gap-1.5 text-sm font-medium text-primary-light">
                      <MapPin size={14} className="flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{job.location}</span>
                    </div>
                    
                    {/* Date & Time */}
                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary-light">
                      <Calendar size={14} className="flex-shrink-0" />
                      <span>{job.date}</span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

