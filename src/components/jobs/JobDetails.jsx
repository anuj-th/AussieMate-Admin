import { ArrowLeft, MoreVertical, Star, Flag, Clock, Mail, Phone, Footprints } from "lucide-react";
import silverTierIcon from "../../assets/icon/silver.svg";

export default function JobDetails({ job, onBackToList }) {
    if (!job) return null;

    const calculatedEscrow = job?.payment?.amountPaid - (job?.payment?.platformFees + job?.payment?.gst);

    const jobDetails = {
        jobId: job?.jobId || "AM10432",
        jobTitle: job?.jobTitle || "Bond Cleaning",
        jobType: job?.jobType || "Cleaning",
        category: job?.category || "Pet Sitter",
        datePosted: job?.datePosted || "19-09-2025",
        postedBy: job?.postedBy || "AM10432",
        status: job?.status || "Completed",
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
            amountPaid: job?.payment?.amountPaid || 320,
            platformFees: job?.payment?.platformFees || 48,
            gst: job?.payment?.gst || 4.8,
            escrow: job?.payment?.escrow || 267.2,
            escrowReleased: job?.payment?.escrowReleased || "20-09-2025",
            escrowStatus: job?.payment?.escrowStatus || "Released",
        },
        jobInfo: {
            category: job?.jobInfo?.category || "Pet Sitter",
            petType: job?.jobInfo?.petType || "Dog",
            breed: job?.jobInfo?.breed || "husky",
            numberOfPets: job?.jobInfo?.numberOfPets || 2,
            serviceType: job?.jobInfo?.serviceType || "Walking",
            description: job?.jobInfo?.description || "Make sure you come prepared with all you need for this service",
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

    return (
        <div className="space-y-6 max-w-full mx-auto overflow-x-hidden pb-10  w-6xl ">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">

                {/* LEFT MAIN SECTION */}
                <div className="lg:col-span-2 space-y-6 w-full ">

                    {/* Header Card */}
                    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between rounded-[12px] 
                p-5 sm:p-6 md:p-[30px] border border-[#F1F1F4] bg-white shadow-sm gap-4 md:gap-0">

                        {/* Left Section */}
                        <div className="space-y-2 w-full">
                            <p className="text-xs sm:text-sm font-medium text-primary-light">Posted by</p>

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
                    <div className="bg-white rounded-lg border border-[#EEF0F5] shadow-sm w-full ">

                        <div className="flex items-center justify-between h-[56px] px-7.5 py-5 border-b border-[#F1F1F4]">
                            <h2 className="text-lg sm:text-xl font-semibold text-primary">Job Overview</h2>
                            <button className="p-1 hover:bg-gray-100 rounded-lg">
                                <MoreVertical size={20} className="text-primary" />
                            </button>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-7.5 py-5 mb-6">

                            {/* Customer */}
                            <div className="border border-[#F1F1F4] rounded-[12px] p-4 bg-white shadow-sm w-full">
                                <h3 className="text-xs sm:text-sm font-semibold text-primary mb-3 ">Customer</h3>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                                        <img src={jobDetails.customer.avatar} alt={jobDetails.customer.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1">
                                        <p className="font-semibold text-sm sm:text-base text-primary">{jobDetails.customer.name}</p>

                                        <div className="space-y-1.5 mt-2">
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-light">
                                                <Mail size={16} />
                                                <span className="truncate">{jobDetails.customer.email}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-light">
                                                <Phone size={16} />
                                                <span className="truncate">{jobDetails.customer.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cleaner */}
                            <div className="border border-[#F1F1F4] rounded-[12px] p-4 bg-white shadow-sm w-full px-7.5 py-5">
                                <h3 className="text-xs sm:text-sm font-semibold text-primary mb-3">Cleaner</h3>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                                        <img src={jobDetails.cleaner.avatar} alt={jobDetails.cleaner.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <div className="flex flex-wrap gap-2">
                                            <p className="font-semibold text-sm sm:text-base text-primary">{jobDetails.cleaner.name}</p>
                                            <p className="text-xs sm:text-sm text-primary-light">• {jobDetails.cleaner.role}</p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[10px] sm:text-xs font-medium"
                                                style={{ backgroundColor: "#FFF4E0", border: "1px solid #FFEDBA" }}>
                                                ⭐ {jobDetails.cleaner.rating}
                                            </span>

                                            <span className="text-[10px] sm:text-xs text-primary-light">({jobDetails.cleaner.jobsCompleted} jobs)</span>

                                            <div className="flex items-center gap-2 px-2 py-1 rounded-xl text-[10px] sm:text-xs font-medium bg-[linear-gradient(90deg,#FDFDFD_0%,#E9E9E9_100%)]">
                                                <img src={silverTierIcon} alt="Silver Tier" className="w-4 h-4 sm:w-5 sm:h-5" />
                                                <span className="text-primary-light">{jobDetails.cleaner.tier} Tier</span>
                                            </div>
                                        </div>

                                        <p className="text-[10px] sm:text-xs text-primary-light">{jobDetails.cleaner.distance}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Payment Card */}
                        <div className="bg-white rounded-[20px] p-5 sm:p-5 px-7 sm:px-5 lg:px-7.5">
                            <h3 className="text-xs sm:text-sm md:text-base font-semibold text-primary mb-4">
                                Payment
                            </h3>

                            <div className="space-y-3">

                                <div className="grid grid-cols-2 sm:grid-cols-3 items-center">
                                    <span className="text-xs sm:text-sm text-primary-light">Mode:</span>
                                    <span className="text-xs sm:text-sm font-medium text-primary">
                                        {jobDetails.payment.mode}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 items-center">
                                    <span className="text-xs sm:text-sm text-primary-light">Amount Paid:</span>
                                    <span className="text-xs sm:text-sm font-medium text-primary">
                                        AU${jobDetails.payment.amountPaid}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 items-center">
                                    <span className="text-xs sm:text-sm text-primary-light">Platform Fees 15%:</span>
                                    <span className="text-xs sm:text-sm font-medium text-primary">
                                        AU${jobDetails.payment.platformFees}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 items-center">
                                    <span className="text-xs sm:text-sm text-primary-light">GST 10%:</span>
                                    <span className="text-xs sm:text-sm font-medium text-primary">
                                        AU${jobDetails.payment.gst}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-xs sm:text-sm text-primary-light">Escrow:</span>

                                    <span className="text-xs sm:text-sm font-medium text-primary mr-25">
                                        AU${jobDetails.payment.escrow} •{" "}
                                        <span className="text-xs sm:text-sm text-primary-light">
                                            released {jobDetails.payment.escrowReleased}
                                        </span>
                                    </span>

                                    <div className="flex justify-start sm:justify-end mt-2 sm:mt-0">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-[6px] 
            text-[8px] sm:text-xs font-medium border ${getStatusColor(
                                                jobDetails.payment.escrowStatus
                                            )}`}>
                                            {jobDetails.payment.escrowStatus}
                                        </span>
                                    </div>
                                </div>


                            </div>
                        </div>



                    </div>

                    {/* Job Info */}
                    <div className="bg-white rounded-[20px] border border-[#EEF0F5] shadow-sm p-4 sm:p-7.5 py-8 sm:py-10">
                        <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4">Job Info</h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm sm:text-base text-primary font-medium">
                                    {jobDetails.jobInfo.category} • {jobDetails.jobInfo.petType} • {jobDetails.jobInfo.breed}
                                </p>
                                <p className="text-xs sm:text-sm text-primary-light mt-1">
                                    Number of pets: {jobDetails.jobInfo.numberOfPets}
                                </p>
                            </div>

                            <div className="flex items-center gap-2 font-medium">
                                <Footprints size={16} className="text-primary-light" />
                                <span className="text-xs sm:text-sm text-primary">
                                    {jobDetails.jobInfo.serviceType}
                                </span>
                            </div>

                            <p className="text-xs sm:text-sm text-primary-light">{jobDetails.jobInfo.description}</p>

                            <div className="w-fit">
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    {jobDetails.jobInfo.images.map((img, index) => (
                                        <div key={index} className="w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] rounded-lg overflow-hidden">
                                            <img src={img} alt={`Pet ${index + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR */}
                <div className="space-y-6 w-full">

                    {/* Timeline */}
                    <div className="bg-white rounded-[20px] border border-[#EEF0F5] shadow-sm p-4 sm:p-7.5 pl-8 sm:pl-10 ">
                        <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4">Timeline</h2>

                        <div className="space-y-4">
                            {jobDetails.timeline.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Clock size={16} className="text-gray-400 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm sm:text-base text-primary">{item.event}</p>
                                        <p className="text-xs sm:text-sm text-primary-light mt-1">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feedback */}
                    <div className="bg-white rounded-[20px] border border-[#EEF0F5] shadow-sm p-4 sm:p-7.5  pl-8 sm:pl-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg sm:text-xl font-semibold text-primary">Feedback</h2>
                            <button className="flex items-center gap-1 px-3 py-1.5 text-xs sm:text-sm text-blue-600 hover:bg-blue-100 rounded-lg transition">
                                <Flag size={16} /> Flag Review
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-1">
                                {renderStars(jobDetails.feedback.rating)}
                                <span className="text-xs sm:text-sm">{jobDetails.feedback.rating}</span>
                            </div>

                            <p className="text-xs sm:text-sm text-primary">{jobDetails.feedback.comment}</p>
                            <div className="flex items-center justify-between text-[10px] sm:text-xs text-primary-light">
                                <span>{jobDetails.feedback.reviewer}</span>
                                <span>{jobDetails.feedback.date}</span>
                            </div>
                        </div>
                    </div>

                    {/* Attachments */}
                    <div className="bg-white rounded-[20px] border border-[#EEF0F5] shadow-sm p-4 sm:p-7.  pl-8 sm:pl-10">
                        <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4">Attachments</h2>

                        <div className="grid grid-cols-2 gap-3">
                            <div>

                                <div className="relative w-full h-full">
                                    <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100">
                                        <img
                                            src={jobDetails.attachments.before}
                                            alt="Before"
                                            className="w-full h-full object-cover"
                                        />

                                        {/* Overlay Text */}
                                        <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                                            Before
                                        </span>
                                    </div>

                                </div>

                            </div>

                            <div>

                                <div className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100">
                                    <img
                                        src={jobDetails.attachments.after}
                                        alt="After"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Overlay Text */}
                                    <span className="absolute top-2 right-2 text-white text-sm font-semibold drop-shadow-md">
                                        After
                                    </span>


                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}
