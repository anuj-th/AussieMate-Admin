import { Star, Flag } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const feedbackData = [
    {
        id: 1,
        title: "Bond Cleaning",
        feedback: "John was professional, and the carpet looks spotless.",
        rating: 4.8,
        tags: ["Punctual", "Professional"],
        customer: {
            name: "Selina K",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
        }
    },
    {
        id: 2,
        title: "Pet Sitter",
        feedback: "Late arrival but job completed",
        rating: 4.8,
        tags: ["Punctual", "Professional"],
        customer: {
            name: "George L",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
    },
    {
        id: 3,
        title: "Bond Cleaning",
        feedback: "John was spotless.",
        rating: 4.1,
        tags: ["Punctual"],
        customer: {
            name: "Sarah M",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        }
    },
    {
        id: 4,
        title: "Pet Sitter",
        feedback: "Excellent service, very satisfied with the work.",
        rating: 5.0,
        tags: ["Punctual", "Professional", "Thorough"],
        customer: {
            name: "Mike T",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
        }
    }
];

const averageRating = 4.6;

export default function FeedbackTab({ cleaner }) {
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

    return (
        <div className="space-y-6">
            {/* Average Rating Card + Feedback Cards */}
            <div className="flex gap-4 -mx-1 px-1 items-stretch">
                {/* Average Rating Summary Card */}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-4 md:p-6 shadow-md w-[280px] md:w-[320px] flex-shrink-0 self-stretch flex flex-col justify-center items-center">
                    <p className="text-sm md:text-sm font-medium text-primary-light mb-2 md:mb-3">Avg rating</p>
                    <div className="space-y-2 md:space-y-3 flex flex-col items-center">
                        <div>
                            {renderStars(averageRating, 32)}
                        </div>
                        <p className="text-2xl font-semibold text-primary">{averageRating}</p>
                    </div>
                </div>

                {/* Feedback Cards Swiper */}
                <div className="flex-1 min-w-0 flex items-stretch pb-2">
                    <Swiper
                        modules={[Autoplay]}
                        spaceBetween={16}
                        slidesPerView="auto"
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        className="feedback-swiper !flex"
                        style={{ height: "100%", display: "flex", alignItems: "stretch", paddingBottom: "8px" }}
                    >
                        {feedbackData.map((feedback) => (
                            <SwiperSlide key={feedback.id} style={{ width: "auto", height: "100%", display: "flex" }}>
                                <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-3 md:p-4 shadow-md w-[280px] md:w-[320px] flex flex-col h-full cursor-pointer">
                                    {/* Header with Title and Flag Button */}
                                    <div className="flex items-start  justify-between mb-2 gap-2">
                                        <h3 className="text-sm font-semibold text-primary-light flex-1">
                                            {feedback.title}
                                        </h3>
                                        <button
                                            onClick={() => handleFlagReview(feedback.id)}
                                            className="flex items-center gap-1 text-xs text-[#2563EB] font-medium cursor-pointer transition-colors flex-shrink-0 whitespace-nowrap"
                                        >
                                            <Flag size={12} className="md:w-[14px] md:h-[14px]" />
                                            <span>Flag Review</span>
                                        </button>
                                    </div>

                                    {/* Feedback Text */}
                                    <p className="text-xs md:text-sm text-primary mb-2 flex-grow">
                                        {feedback.feedback}
                                    </p>

                                    {/* Stars and Rating */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="scale-90 md:scale-100 origin-left">
                                            {renderStars(feedback.rating)}
                                        </div>
                                        <span className="text-xs md:text-sm font-medium text-primary">
                                            {feedback.rating}
                                        </span>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2">
                                        {feedback.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-[#EBF2FD] text-[#2563EB] border border-[#2563EB33]"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Customer Info */}
                                    <div className="flex items-center justify-end gap-2 mt-auto pt-2 border-t border-[#E5E7EB]">
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
                </div>
            </div>
        </div>
    );
}
