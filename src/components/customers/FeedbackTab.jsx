import { useMemo, useRef } from "react";
import { Flag, Star, Upload } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const feedbackData = [
  {
    id: 1,
    name: "Naomi P",
    service: "Cleaning • Bond Cleaning",
    feedback: "Cleaner was polite and thorough",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?img=52",
  },
  {
    id: 2,
    name: "Noah Orn",
    service: "Handyman",
    feedback: "Cleaner was polite and thorough",
    rating: 4.0,
    avatar: "https://i.pravatar.cc/150?img=57",
  },
  {
    id: 3,
    name: "Naomi P",
    service: "Handyman",
    feedback: "Cleaner was polite and thorough",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 4,
    name: "Noah Orn",
    service: "Handyman",
    feedback: "Cleaner was polite and thorough",
    rating: 4.0,
    avatar: "https://i.pravatar.cc/150?img=57",
  },
];

const matePoints = [
  { id: "AM10432", points: 200, service: "Cleaning • Bond Cleaning" },
  { id: "AM10433", points: 100, service: "Handyman" },
  { id: "AM10433-2", points: 100, service: "Handyman" },
];

export default function FeedbackTab({ customer }) {
  const averageRating = useMemo(() => {
    if (!feedbackData.length) return 0;
    const total = feedbackData.reduce((sum, item) => sum + item.rating, 0);
    return (total / feedbackData.length).toFixed(1);
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={18}
            className="text-[#F6B100] fill-[#F6B100]"
          />
        ))}
        {hasHalfStar && (
          <Star
            size={18}
            className="text-[#F6B100] fill-[#F6B100]"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={18}
            className="text-[#E5E7EB] fill-none"
          />
        ))}
      </div>
    );
  };

  const handleFlagReview = (feedbackId) => {
    // TODO: wire flag review action
    console.log("Flag review clicked", feedbackId);
  };

  const matePointsRef = useRef(null);

  const handleExportReport = () => {
    // Create CSV content
    const headers = ["Points", "ID", "Service"];
    const csvRows = [
      headers.join(","),
      ...matePoints.map((row) => [
        `${row.points} pts`,
        row.id,
        `"${row.service}"`,
      ].join(",")),
    ];
    const csvContent = csvRows.join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `MatePoints_Report_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Feedback cards */}
      <div className="bg-transparent">
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
            {feedbackData.map((item) => (
              <SwiperSlide
                key={item.id}
                className="h-full flex"
                style={{ width: "auto", height: "100%", display: "flex" }}
              >
                <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-4 shadow-sm flex flex-col gap-3 md:min-w-[350px] h-full min-h-full cursor-pointer">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-primary truncate">
                          {item.name}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleFlagReview(item.id)}
                      className="flex items-center gap-1 text-xs text-[#2563EB] font-medium whitespace-nowrap"
                    >
                      <Flag size={14} className="text-[#2563EB]" />
                      <span>Flag Review</span>
                    </button>
                  </div>

                  <div className="flex flex-col leading-tight">
                    <p className="text-xs text-primary-light">
                      {item.service}
                    </p>
                    <p className="text-sm text-primary">
                      {item.feedback}
                    </p>
                  </div>


                  <div className="flex items-center gap-2">
                    {renderStars(item.rating)}
                    <span className="text-sm font-medium text-primary">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* MatePoints table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm" ref={matePointsRef}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-7.5 py-4 border-b border-[#EEF0F5]">
          <h3 className="text-base font-medium text-primary">MatePoints</h3>
          <button
            type="button"
            onClick={handleExportReport}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Upload size={16} className="text-gray-600" />
            Export report
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="px-6 py-4">
            {matePoints.map((row, index) => (
              <div
                key={row.id}
                className={`flex items-center gap-6 py-2 ${index !== matePoints.length - 1 ? "" : ""
                  }`}
              >
                <div className="text-base font-medium text-primary whitespace-nowrap min-w-[80px]">
                  {row.points} pts
                </div>
                <div className="text-sm text-primary-light whitespace-nowrap min-w-[100px]">
                  {row.id}
                </div>
                <div className="text-sm text-primary-light">
                  {row.service}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

