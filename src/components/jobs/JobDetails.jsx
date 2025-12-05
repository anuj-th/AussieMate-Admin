import { useState } from "react";
import { MapPin, Calendar, DollarSign, User, Briefcase } from "lucide-react";

export default function JobDetails({ job, onBackToList }) {
    if (!job) return null;

    const getJobStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return {
                    dot: "bg-[#17C653]",
                    text: "text-[#17C653]",
                    bg: "bg-[#EAFFF1]",
                    border: "border-[#17C65333]",
                };
            case "Ongoing":
                return {
                    dot: "bg-[#F6B100]",
                    text: "text-[#F6B100]",
                    bg: "bg-[#FFF8DD]",
                    border: "border-[#F6B10033]",
                };
            case "Upcoming":
                return {
                    dot: "bg-[#2563EB]",
                    text: "text-[#2563EB]",
                    bg: "bg-[#EBF2FD]",
                    border: "border-[#2563EB33]",
                };
            case "Cancelled":
                return {
                    dot: "bg-[#EF4444]",
                    text: "text-[#EF4444]",
                    bg: "bg-[#FFE5E9]",
                    border: "border-[#EF444433]",
                };
            default:
                return {
                    dot: "bg-gray-400",
                    text: "text-gray-400",
                    bg: "bg-gray-100",
                    border: "border-gray-300",
                };
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case "Released":
                return {
                    dot: "bg-[#17C653]",
                    text: "text-[#17C653]",
                    bg: "bg-[#EAFFF1]",
                    border: "border-[#17C65333]",
                };
            case "Held":
                return {
                    dot: "bg-[#F6B100]",
                    text: "text-[#F6B100]",
                    bg: "bg-[#FFF8DD]",
                    border: "border-[#F6B10033]",
                };
            case "Cancelled":
                return {
                    dot: "bg-[#EF4444]",
                    text: "text-[#EF4444]",
                    bg: "bg-[#FFE5E9]",
                    border: "border-[#EF444433]",
                };
            default:
                return {
                    dot: "bg-gray-400",
                    text: "text-gray-400",
                    bg: "bg-gray-100",
                    border: "border-gray-300",
                };
        }
    };

    const jobStatusColors = getJobStatusColor(job.jobStatus);
    const paymentStatusColors = getPaymentStatusColor(job.paymentStatus);

    return (
        <div className="space-y-6">
            {/* Job Header Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-primary mb-2">
                            {job.jobId}
                        </h2>
                        <p className="text-gray-600">{job.jobType}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${jobStatusColors.bg} ${jobStatusColors.border} ${jobStatusColors.text}`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${jobStatusColors.dot}`}
                            />
                            {job.jobStatus}
                        </span>
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium ${paymentStatusColors.bg} ${paymentStatusColors.border} ${paymentStatusColors.text}`}
                        >
                            <span
                                className={`w-2 h-2 rounded-full ${paymentStatusColors.dot}`}
                            />
                            {job.paymentStatus}
                        </span>
                    </div>
                </div>

                {/* Job Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar size={20} className="text-[#2563EB]" />
                        <div>
                            <p className="text-xs text-gray-500">Date</p>
                            <p className="text-sm font-medium text-primary">{job.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <DollarSign size={20} className="text-[#2563EB]" />
                        <div>
                            <p className="text-xs text-gray-500">Amount Paid</p>
                            <p className="text-sm font-medium text-primary">
                                {job.amountPaid !== null
                                    ? `AU$${job.amountPaid.toLocaleString()}`
                                    : "-"}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin size={20} className="text-[#2563EB]" />
                        <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-medium text-primary">
                                Sydney, NSW
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer & Cleaner Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <User size={20} className="text-[#2563EB]" />
                        <h3 className="text-lg font-semibold text-primary">Customer</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            src={job.customer.avatar}
                            alt={job.customer.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-primary text-lg">
                                {job.customer.name}
                            </p>
                            <p className="text-sm text-gray-600">{job.customer.email}</p>
                        </div>
                    </div>
                </div>

                {/* Cleaner Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Briefcase size={20} className="text-[#2563EB]" />
                        <h3 className="text-lg font-semibold text-primary">Cleaner</h3>
                    </div>
                    <div className="flex items-center gap-4">
                        <img
                            src={job.cleaner.avatar}
                            alt={job.cleaner.name}
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold text-primary text-lg">
                                {job.cleaner.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Details Section */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">
                    Job Details
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Job ID</span>
                        <span className="font-medium text-primary">{job.jobId}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Job Type</span>
                        <span className="font-medium text-primary">{job.jobType}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Date</span>
                        <span className="font-medium text-primary">{job.date}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Amount Paid</span>
                        <span className="font-medium text-primary">
                            {job.amountPaid !== null
                                ? `AU$${job.amountPaid.toLocaleString()}`
                                : "-"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

