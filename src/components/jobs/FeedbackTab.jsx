import { Flag } from "lucide-react";

export default function FeedbackTab({ jobDetails, renderStars }) {
    return (
        <div className="bg-white rounded-xl border border-[#EEF0F5] shadow-sm">
            <div className="flex items-center justify-between border-b border-[#F1F1F4] px-4 sm:px-5 md:px-6 lg:px-4 xl:px-7 py-2 sm:py-3">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-primary">Feedback</h2>
                <button className="flex items-center gap-1 text-[10px] sm:text-xs text-blue-600 hover:bg-blue-100 rounded-lg transition flex-shrink-0 whitespace-nowrap">
                    <Flag size={14} className="sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Flag Review</span>
                </button>
            </div>

            <div className="space-y-3 px-4 sm:px-5 md:px-6 lg:px-4 xl:px-7 py-4 sm:py-5">
                <div className="flex items-center gap-1">
                    {renderStars(jobDetails.feedback.rating)}
                    <span className="text-xs sm:text-sm">{jobDetails.feedback.rating}</span>
                </div>

                <p className="text-xs sm:text-sm text-primary">{jobDetails.feedback.comment}</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                            src={jobDetails.feedback.avatar || jobDetails.cleaner.avatar || jobDetails.customer.avatar}
                            alt={jobDetails.feedback.reviewer}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-primary">{jobDetails.feedback.reviewer}</span>
                        <span className="text-xs text-primary-light">{jobDetails.feedback.date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

