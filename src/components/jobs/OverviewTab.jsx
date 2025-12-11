import { Mail, Phone, Star, MoreVertical } from "lucide-react";
import silverTierIcon from "../../assets/icon/silver.svg";

export default function OverviewTab({ jobDetails, getStatusColor }) {
    return (
        <div className="bg-white rounded-xl border border-[#EEF0F5] shadow-sm w-full">

            <div className="flex items-center justify-between min-h-[56px] px-4 sm:px-5 md:px-6 lg:px-7.5 py-4 sm:py-5 border-b border-[#F1F1F4]">
                <h2 className="font-semibold text-sm sm:text-base text-primary">Job Overview</h2>
                <button className="p-1 hover:bg-gray-100 rounded-lg flex-shrink-0">
                    <MoreVertical size={20} className="text-primary" />
                </button>

            </div>

            <div className="p-4 sm:p-5 xl:p-6 lg:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Customer */}
                    <div className="border border-[#F1F1F4] rounded-[12px] p-2 xl:p-3 sm:p-3 lg:px-2 lg:py-4 bg-white w-full">
                        <h3 className="text-xs sm:text-sm font-semibold text-primary mb-3 ">Customer</h3>

                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={jobDetails.customer.avatar} alt={jobDetails.customer.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-primary break-words">{jobDetails.customer.name}</p>

                                <div className=" mt-2 space-y-1">
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-light">
                                        <Mail size={16} className="flex-shrink-0" />
                                        <span className="break-all">{jobDetails.customer.email}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-light">
                                        <Phone size={16} className="flex-shrink-0" />
                                        <span className="break-all">{jobDetails.customer.phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cleaner */}
                    <div className="border border-[#F1F1F4] rounded-[12px] p-2 xl:p-3 sm:p-3 lg:px-2 lg:py-4 bg-white w-full">
                        <h3 className="text-xs sm:text-sm font-semibold text-primary mb-1">Cleaner</h3>

                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={jobDetails.cleaner.avatar} alt={jobDetails.cleaner.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 space-y-2 min-w-0">
                                <div className="flex items-center flex-wrap gap-1">
                                    <p className="font-semibold text-sm text-primary break-words">{jobDetails.cleaner.name}</p>
                                    <p className="text-xs sm:text-sm text-primary-light whitespace-nowrap">• {jobDetails.cleaner.role}</p>
                                </div>

                                <div className="flex flex-wrap justify-between items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFF4E0]"
                                            style={{ border: "0.6px solid #FFEDBA" }}
                                        >
                                            <Star size={14} className="text-[#FFB020] fill-[#FFB020]" />
                                            <span className="text-[10px] sm:text-xs text-primary font-medium">
                                                {jobDetails.cleaner.rating}
                                            </span>
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-primary-light">({jobDetails.cleaner.jobsCompleted} jobs)</span>
                                    </div>

                                    <div className="flex items-center gap-2 px-2 py-1 border-[0.5px] border-[#E9E9E9] rounded-full text-[10px] sm:text-xs font-medium bg-[linear-gradient(90deg,#FDFDFD_0%,#E9E9E9_100%)]">
                                        <img src={silverTierIcon} alt="Silver Tier" className="w-4 h-4 sm:w-5 sm:h-5" />
                                        <span className="text-primary-light">{jobDetails.cleaner.tier} Tier</span>
                                    </div>
                                </div>

                                <p className="text-xs text-primary-light">{jobDetails.cleaner.distance}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Payment Card */}
                <div className="bg-white rounded-[20px] mt-5">
                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-primary mb-4">
                        Payment
                    </h3>

                    <div className="space-y-3">

                        <div className="flex sm:grid sm:grid-cols-[160px_auto] justify-between sm:justify-start items-center gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm text-primary-light">Mode:</span>
                            <span className="text-xs sm:text-sm font-medium text-primary">
                                {jobDetails.payment.mode}
                            </span>
                        </div>

                        <div className="flex sm:grid sm:grid-cols-[160px_auto] justify-between sm:justify-start items-center gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm text-primary-light">Amount Paid:</span>
                            <span className="text-xs sm:text-sm font-medium text-primary">
                                AU${jobDetails.payment.amountPaid}
                            </span>
                        </div>

                        <div className="flex sm:grid sm:grid-cols-[160px_auto] justify-between sm:justify-start items-center gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm text-primary-light">Platform Fees 15%:</span>
                            <span className="text-xs sm:text-sm font-medium text-primary">
                                AU${jobDetails.payment.platformFees}
                            </span>
                        </div>

                        <div className="flex sm:grid sm:grid-cols-[160px_auto] justify-between sm:justify-start items-center gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm text-primary-light">GST 10%:</span>
                            <span className="text-xs sm:text-sm font-medium text-primary">
                                AU${jobDetails.payment.gst}
                            </span>
                        </div>

                        <div className="flex sm:grid sm:grid-cols-[160px_1fr] justify-between sm:justify-start items-center gap-2">
                            <span className="text-xs sm:text-sm text-primary-light">Escrow:</span>
                            <div className="flex sm:flex-row items-center justify-end sm:justify-between w-full gap-2 sm:gap-3 flex-wrap">
                                <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                                    <span className="text-xs sm:text-sm font-medium text-primary">
                                        AU${jobDetails.payment.escrow}
                                    </span>
                                    <span className="text-[10px] sm:text-xs text-primary-light">
                                        • released {jobDetails.payment.escrowReleased}
                                    </span>
                                </div>
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-[6px] text-[10px] sm:text-xs font-medium border whitespace-nowrap ${getStatusColor(
                                        jobDetails.payment.escrowStatus
                                    )}`}>
                                    {jobDetails.payment.escrowStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

