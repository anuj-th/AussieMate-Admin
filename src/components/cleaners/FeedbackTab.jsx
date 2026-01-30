import { Star, Flag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const formatShortDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};

export default function FeedbackTab({ cleaner, averageRating = 0, reviews = [], pagination }) {
    const renderStars = (rating, starSize = 16) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-0.5">
                {[...Array(fullStars)].map((_, i) => (
                    <Star
                        key={`full-${i}`}
                        size={starSize}
                        className="text-[#F6B100] fill-[#F6B100]"
                    />
                ))}
                {hasHalfStar && (
                    <Star
                        size={starSize}
                        className="text-[#F6B100] fill-[#F6B100]"
                        style={{ clipPath: 'inset(0 50% 0 0)' }}
                    />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <Star
                        key={`empty-${i}`}
                        size={starSize}
                        className="text-[#D1D5DB] fill-none"
                    />
                ))}
            </div>
        );
    };

    const handleFlagReview = (feedbackId) => {
        // TODO: Implement flag review functionality
        console.log("Flag review for feedback:", feedbackId);
    };

    const mappedReviews = (Array.isArray(reviews) ? reviews : []).map((r) => {
        const customerName = r?.customer?.name || "Customer";
        const title = r?.job?.serviceType || "Job";
        const dateLabel = formatShortDate(r?.job?.scheduledDate || r?.createdAt);
        const tags = Array.isArray(r?.likedAspects) ? r.likedAspects : [];
        const feedbackText = (r?.feedback || "").toString().trim();
        return {
            id: r?.id || r?._id,
            title: dateLabel ? `${title} • ${dateLabel}` : title,
            rating: Number(r?.rating || 0),
            tags,
            feedback: feedbackText || "—",
            customer: {
                name: customerName,
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(customerName)}&background=random`,
            },
        };
    });

    return (
        <div className="space-y-6">
            {/* Average Rating Card + Feedback Cards */}
            <div className="flex gap-4 -mx-1 px-1 items-stretch">

                {/* ⭐ Average Rating Summary Card (same height as others) */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6 shadow-md 
        w-[320px] h-[212px] flex-shrink-0 flex flex-col justify-center 
        items-center">

                    <p className="text-sm md:text-sm font-medium text-primary-light mb-2 md:mb-3">
                        Avg rating
                    </p>

                    <div className="space-y-2 md:space-y-3 flex flex-col items-center">
                        <div>{renderStars(averageRating, 32)}</div>
                        <p className="text-2xl font-semibold text-primary">{averageRating}</p>
                        {pagination?.totalReviews !== undefined && (
                            <p className="text-xs text-primary-light font-medium">
                                {pagination.totalReviews} reviews
                            </p>
                        )}
                    </div>
                </div>

                {/* ⭐ Feedback Cards Swiper */}
                <div className="flex-1 min-w-0 flex items-stretch overflow-visible">
                    {mappedReviews.length === 0 ? (
                        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-sm text-primary-light w-[320px] h-[212px] flex items-center justify-center">
                            No reviews found for this cleaner.
                        </div>
                    ) : (
                        <Swiper
                            modules={[Autoplay]}
                            spaceBetween={16}
                            slidesPerView="auto"
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop={mappedReviews.length > 1}
                            className="feedback-swiper !flex"
                            style={{
                                height: "212px",
                                display: "flex",
                                alignItems: "stretch",
                                overflow: "visible",
                            }}
                        >
                            {mappedReviews.map((feedback) => (
                            <SwiperSlide
                                key={feedback.id}
                                style={{
                                    width: "320px",
                                    height: "212px",
                                    display: "flex",
                                    overflow: "visible",
                                }}
                            >
                                    {/* ⭐ Feedback Card (same height as Avg Rating card) */}
                                    <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-3 md:p-4 shadow-md 
                    w-[320px] h-[212px] flex flex-col cursor-pointer overflow-hidden">

                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-2 gap-2">
                                            <h3 className="text-sm font-semibold text-primary-light flex-1">
                                                {feedback.title}
                                            </h3>

                                            <button
                                                onClick={() => handleFlagReview(feedback.id)}
                                                className="flex items-center gap-1 text-xs text-[#2563EB] font-medium 
                      cursor-pointer transition-colors flex-shrink-0 whitespace-nowrap"
                                            >
                                                <Flag size={12} className="md:w-[14px] md:h-[14px]" />
                                                <span>Flag Review</span>
                                            </button>
                                        </div>

                                        {/* Feedback Text */}
                                        <p className="text-xs md:text-sm text-primary mb-2 flex-grow line-clamp-2 overflow-hidden">
                                            {feedback.feedback}
                                        </p>

                                        {/* Stars and Rating */}
                                        <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                                            <div className="scale-90 md:scale-100 origin-left">
                                                {renderStars(feedback.rating)}
                                            </div>
                                            <span className="text-xs md:text-sm font-medium text-primary">
                                                {feedback.rating}
                                            </span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 flex-shrink-0">
                                            {feedback.tags.slice(0, 3).map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs 
                        font-medium bg-[#EBF2FD] text-[#2563EB] border border-[#2563EB33]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Customer Info */}
                                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E7EB] flex-shrink-0">
                                            <img
                                                src={feedback.customer.avatar}
                                                alt={feedback.customer.name}
                                                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
                                            />
                                            <span className="text-xs md:text-sm font-medium text-primary">
                                                {feedback.customer.name}
                                            </span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </div>

    );
}
