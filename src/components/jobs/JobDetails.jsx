import { Star, MoreVertical } from "lucide-react";
import OverviewTab from "./OverviewTab";
import JobInfoTab from "./JobInfoTab";
import TimelineTab from "./TimelineTab";
import FeedbackTab from "./FeedbackTab";
import AttachmentsTab from "./AttachmentsTab";

export default function JobDetails({ job, onBackToList }) {
    if (!job) return null;

    // Derive payment figures when only summary data is available from JobsTable
    const amountPaid = job?.payment?.amountPaid ?? job?.amountPaid ?? 0;
    const platformFees =
        job?.payment?.platformFees ?? Math.round(amountPaid * 0.15 * 100) / 100;
    const gst = job?.payment?.gst ?? Math.round(amountPaid * 0.1 * 100) / 100;
    const escrow =
        job?.payment?.escrow ?? Math.max(amountPaid - (platformFees + gst), 0);
    const escrowReleased = job?.payment?.escrowReleased || job?.date || "20-09-2025";

    const jobDetails = {
        jobId: job?.jobId || "AM10432",
        jobTitle: job?.jobTitle || job?.jobType || "Bond Cleaning",
        jobType: job?.jobType || "Cleaning",
        category: job?.category || job?.jobType || "Pet Sitter",
        datePosted: job?.datePosted || job?.date || "19-09-2025",
        postedBy: job?.postedBy || "AM10432",
        status: job?.status || job?.jobStatus || "Completed",
        customer: {
            name: job?.customer?.name || "Jason Tatum",
            email: job?.customer?.email || "selina.k@email.com",
            phone: job?.customer?.phone || "435 657 546",
            avatar: job?.customer?.avatar || "https://i.pravatar.cc/150?img=1",
        },
        cleaner: {
            name: job?.cleaner?.name || "Selina K.",
            role: job?.cleaner?.role || "Professional Cleaner",
            rating: job?.cleaner?.rating || 4.7,
            jobsCompleted: job?.cleaner?.jobsCompleted || 84,
            distance: job?.cleaner?.distance || "8 km distance radius",
            tier: job?.cleaner?.tier || "Silver",
            avatar: job?.cleaner?.avatar || "https://i.pravatar.cc/150?img=11",
        },
        payment: {
            mode: job?.payment?.mode || "Online",
            amountPaid,
            platformFees,
            gst,
            escrow,
            escrowReleased,
            escrowStatus: job?.payment?.escrowStatus || job?.paymentStatus || "Released",
        },
        jobInfo: {
            category: job?.jobInfo?.category || "Pet Sitter",
            petType: job?.jobInfo?.petType || "Dog",
            breed: job?.jobInfo?.breed || "husky",
            numberOfPets: job?.jobInfo?.numberOfPets || 2,
            serviceType: job?.jobInfo?.serviceType || job?.jobType || "Walking",
            description:
                job?.jobInfo?.description ||
                job?.description ||
                "Make sure you come prepared with all you need for this service",
            images: job?.jobInfo?.images || [
                "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
                "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400",
                "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
                "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
            ],
        },
        timeline: [
            { event: "Job created by Selina K", time: "2025-09-19 08:40" },
            { event: "6 bids received", time: "2025-09-19 08:45" },
            { event: "Selina K selected", time: "2025-09-19 09:00" },
            { event: "Payment AU$320 captured", time: "2025-09-19 09:05" },
            { event: "Job marked complete by customer", time: "2025-09-20 13:12" },
            { event: "Escrow AU$256 released to cleaner", time: "2025-09-20 13:12" },
        ],
        feedback: {
            rating: 5.0,
            comment: "Excellent work, apartment spotless.",
            reviewer: "Selina K.",
            date: "2025-09-19",
        },
        attachments: {
            before: "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400",
            after: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400",
        },
    };

    const renderStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating * 2) / 2;
        const fullStars = Math.floor(roundedRating);
        const hasHalfStar = roundedRating % 1 === 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
        }
        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative inline-block">
                    <Star size={16} className="text-gray-300" />
                    <div className="absolute top-0 left-0 overflow-hidden" style={{ width: "50%" }}>
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    </div>
                </div>
            );
        }
        return stars;
    };

    const getStatusColor = (status) => {
        if (status === "Completed" || status === "Released") {
            return "bg-[#EAFFF1] text-[#17C653] border-[#17C65333]";
        }
        return "bg-[#FFF8DD] text-[#F6B100] border-[#F6B10033]";
    };

    const highlightUserNames = (text) => {
        const cleanerName = jobDetails.cleaner.name;
        const customerName = jobDetails.customer.name;
        
        // Remove trailing period if present for matching
        const cleanerNameClean = cleanerName.replace(/\.$/, "");
        const customerNameClean = customerName.replace(/\.$/, "");
        
        // Create regex patterns for both full names and variations
        const names = [cleanerName, cleanerNameClean, customerName, customerNameClean].filter(Boolean);
        
        // Sort by length (longest first) to match longer names first
        names.sort((a, b) => b.length - a.length);
        
        let result = text;
        const parts = [];
        let lastIndex = 0;
        
        // Find all matches with their positions
        const matches = [];
        names.forEach(name => {
            const regex = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            let match;
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    start: match.index,
                    end: match.index + match[0].length,
                    name: match[0]
                });
            }
        });
        
        // Sort matches by start position
        matches.sort((a, b) => a.start - b.start);
        
        // Merge overlapping matches
        const mergedMatches = [];
        matches.forEach(match => {
            const lastMatch = mergedMatches[mergedMatches.length - 1];
            if (lastMatch && match.start <= lastMatch.end) {
                // Overlapping or adjacent, merge them
                lastMatch.end = Math.max(lastMatch.end, match.end);
                lastMatch.name = text.substring(lastMatch.start, lastMatch.end);
            } else {
                mergedMatches.push({ ...match });
            }
        });
        
        // Build the parts array
        mergedMatches.forEach(match => {
            // Add text before match
            if (match.start > lastIndex) {
                parts.push({
                    text: text.substring(lastIndex, match.start),
                    isName: false
                });
            }
            // Add highlighted name
            parts.push({
                text: match.name,
                isName: true
            });
            lastIndex = match.end;
        });
        
        // Add remaining text
        if (lastIndex < text.length) {
            parts.push({
                text: text.substring(lastIndex),
                isName: false
            });
        }
        
        // If no matches found, return original text
        if (parts.length === 0) {
            parts.push({ text, isName: false });
        }
        
        return parts;
    };

    return (
        <div className="space-y-6 mx-auto w-full max-w-6xl overflow-x-hidden pb-10">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

                {/* LEFT MAIN SECTION */}
                <div className="lg:col-span-2 space-y-6 w-full ">

                    {/* Header Card */}
                    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between rounded-[12px] 
                p-4 sm:p-5 md:p-6 lg:p-[30px] border border-[#F1F1F4] bg-white shadow-sm gap-4 md:gap-0">

                        {/* Left Section */}
                        <div className="w-full">
                            <p className="text-xs font-medium text-primary-light">Posted by</p>

                            <div className="flex flex-wrap items-center gap-3">
                                <span className="font-semibold text-xl sm:text-2xl text-primary">
                                    {jobDetails.jobId}
                                </span>

                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-[6px] text-[10px] sm:text-xs font-medium border 
                ${getStatusColor(jobDetails.status)}`}>
                                    {jobDetails.status}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm font-medium text-primary-light">
                                {jobDetails.category}
                            </p>
                        </div>

                        {/* Right Section */}
                        <div className="text-xs sm:text-sm font-medium text-primary-light md:text-right whitespace-nowrap">
                            Date Posted: {jobDetails.datePosted}
                        </div>
                    </div>

                    {/* Job Overview */}
                    <OverviewTab jobDetails={jobDetails} getStatusColor={getStatusColor} />

                    {/* Job Info */}
                    <JobInfoTab jobDetails={jobDetails} />
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-6 w-full">

                    {/* Timeline */}
                    <TimelineTab jobDetails={jobDetails} highlightUserNames={highlightUserNames} />

                    {/* Feedback */}
                    <FeedbackTab jobDetails={jobDetails} renderStars={renderStars} />

                    {/* Attachments */}
                    <AttachmentsTab jobDetails={jobDetails} />

                </div>
            </div>
        </div>
    );
}
