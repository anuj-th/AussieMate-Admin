import { useState } from "react";
import { Mail, Phone, Star, MoreVertical, FileText, RefreshCcw } from "lucide-react";
import silverTierIcon from "../../assets/icon/silver.svg";
import goldTierIcon from "../../assets/icon/gold.svg";
import bronzeTierIcon from "../../assets/icon/bronze.svg";
import camelIllustration from "../../assets/image/camel.svg";
import CustomMenu from "../common/CustomMenu";
import ReleaseFundsModal from "../common/ReleaseFundsModal";
import ActionModal from "../common/ActionModal";
import { updatePaymentStatus } from "../../api/services/jobService";

export default function OverviewTab({ jobDetails, getStatusColor, onPaymentStatusUpdate }) {
    const [isReleaseModalOpen, setIsReleaseModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [escrowStatus, setEscrowStatus] = useState(
        jobDetails?.payment?.escrowStatus || "Pending"
    );

    // Use local state if available, otherwise fallback to prop
    const currentEscrowStatus = escrowStatus || jobDetails?.payment?.escrowStatus || "Pending";
    const isEscrowReleased = currentEscrowStatus?.toLowerCase() === "released";

    // Get tier icon based on cleaner tier
    const tier = (jobDetails?.cleaner?.tier || "none").toString().toLowerCase();
    const tierIcon =
        tier === "gold"
            ? goldTierIcon
            : tier === "bronze"
                ? bronzeTierIcon
                : tier === "none"
                    ? null
                    : silverTierIcon;
    const tierLabel = tier === "none" 
        ? "None Tier" 
        : `${tier.charAt(0).toUpperCase()}${tier.slice(1)} Tier`;

    const handleInvoiceDownload = () => {
        const pdf = buildInvoicePdf(jobDetails);
        const blob = new Blob([pdf], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${jobDetails?.jobId || "invoice"}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const paymentMenuItems = isEscrowReleased
        ? [
            {
                id: "invoice",
                label: "Generate Invoice (PDF)",
                icon: <FileText size={22} className="text-[#8CA4C3]" />,
                onClick: handleInvoiceDownload,
            },
        ]
        : [
            {
                id: "release-funds",
                label: "Release Funds",
                icon: <RefreshCcw size={22} className="text-[#1F6FEB]" />,
                onClick: () => setIsReleaseModalOpen(true),
            },
            {
                id: "invoice",
                label: "Generate Invoice (PDF)",
                icon: <FileText size={22} className="text-[#8CA4C3]" />,
                onClick: handleInvoiceDownload,
            },
        ];

    return (
        <div className="bg-white rounded-xl border border-[#EEF0F5] shadow-sm w-full">

            <div className="flex items-center justify-between min-h-[56px] px-4 sm:px-5 md:px-6 lg:px-7.5 py-4 sm:py-5 border-b border-[#F1F1F4]">
                <h2 className="font-semibold text-sm sm:text-base text-primary">Job Overview</h2>
                <CustomMenu
                    align="right"
                    trigger={
                        <button className="p-1 flex-shrink-0 cursor-pointer">
                            <MoreVertical size={20} className="text-primary" />
                        </button>
                    }
                    items={paymentMenuItems}
                    className="min-w-[260px]"
                />

            </div>

            <div className="p-4 sm:p-5 xl:p-6 lg:p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Customer */}
                    <div className="border border-[#F1F1F4] rounded-[12px] p-2 xl:p-3 sm:p-3 lg:px-2 lg:py-4 bg-white w-full">
                        <h3 className="text-xs sm:text-sm font-semibold text-primary mb-3 ">Customer</h3>

                        <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img src={jobDetails.customer?.avatar || "https://ui-avatars.com/api/?name=Customer&background=random"} alt={jobDetails.customer?.name || "Customer"} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm text-primary break-words">{jobDetails.customer?.name || "—"}</p>

                                <div className=" mt-2 space-y-1">
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-light">
                                        <Mail size={16} className="flex-shrink-0" />
                                        <span className="break-all">{jobDetails.customer?.email || "—"}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-light">
                                        <Phone size={16} className="flex-shrink-0" />
                                        <span className="break-all">{jobDetails.customer?.phone || "—"}</span>
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
                                <img src={jobDetails.cleaner?.avatar || "https://ui-avatars.com/api/?name=Cleaner&background=random"} alt={jobDetails.cleaner?.name || "Cleaner"} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 space-y-2 min-w-0">
                                <div className="flex items-center flex-wrap gap-1">
                                    <p className="font-semibold text-sm text-primary break-words">{jobDetails.cleaner?.name || "—"}</p>
                                    {jobDetails.cleaner?.role && (
                                        <p className="text-xs sm:text-sm text-primary-light whitespace-nowrap">• {jobDetails.cleaner.role}</p>
                                    )}
                                </div>

                                <div className="flex flex-wrap justify-between items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        {(jobDetails.cleaner?.rating || jobDetails.cleaner?.rating === 0) && (
                                            <div
                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFF4E0]"
                                                style={{ border: "0.6px solid #FFEDBA" }}
                                            >
                                                <Star size={14} className="text-[#FFB020] fill-[#FFB020]" />
                                                <span className="text-[10px] sm:text-xs text-primary font-medium">
                                                    {jobDetails.cleaner.rating}
                                                </span>
                                            </div>
                                        )}
                                        {jobDetails.cleaner?.jobsCompleted !== undefined && (
                                            <span className="text-[10px] sm:text-xs text-primary-light">({jobDetails.cleaner.jobsCompleted} jobs)</span>
                                        )}
                                    </div>

                                    {tierIcon && (
                                        <div className="flex items-center gap-2 px-2 py-1 border-[0.5px] border-[#E9E9E9] rounded-full text-[10px] sm:text-xs font-medium bg-[linear-gradient(90deg,#FDFDFD_0%,#E9E9E9_100%)]">
                                            <img src={tierIcon} alt={tierLabel} className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="text-primary-light">{tierLabel}</span>
                                        </div>
                                    )}
                                </div>

                                {jobDetails.cleaner?.distance && (
                                    <p className="text-xs text-primary-light">{jobDetails.cleaner.distance}</p>
                                )}
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
                                        currentEscrowStatus
                                    )}`}>
                                    {currentEscrowStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReleaseFundsModal
                isOpen={isReleaseModalOpen}
                onClose={() => setIsReleaseModalOpen(false)}
                jobDetails={jobDetails}
                onConfirm={async () => {
                    try {
                        // Use _id (MongoDB ID) instead of jobId (display ID like AM85307)
                        const jobId = jobDetails?._id || jobDetails?.id || jobDetails?.jobId;
                        if (jobId) {
                            // Call API to update payment status
                            await updatePaymentStatus(jobId, "Released");
                            
                            // Update local state
                            setEscrowStatus("Released");
                            
                            // Notify parent component to update JobsTable
                            if (onPaymentStatusUpdate) {
                                onPaymentStatusUpdate(jobId, "Released");
                            }
                        }
                        setIsReleaseModalOpen(false);
                        setIsSuccessModalOpen(true);
                    } catch (error) {
                        console.error("Failed to update payment status", error);
                        setIsReleaseModalOpen(false);
                        // Show error message or keep modal open
                        alert("Failed to update payment status. Please try again.");
                    }
                }}
            />

            {/* Success Modal */}
            <ActionModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
                illustration={
                    <div className="flex flex-col items-center">
                        <img
                            src={camelIllustration}
                            alt="Release success"
                            className="w-40 sm:w-48 h-auto object-contain"
                        />
                    </div>
                }
                title={
                    <div className="space-y-2">
                        <p className="text-lg sm:text-xl font-semibold text-[#111827]">
                            {jobDetails?.jobId || "AM10432"}
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-[#111827]">
                            Funds successfully released to Cleaner
                        </p>
                        <p className="text-base sm:text-lg font-semibold text-[#111827]">
                            {jobDetails?.cleaner?.name || "Jason Tatum"}.
                        </p>
                        <p className="text-sm sm:text-base text-[#6B7280] font-normal mt-2">
                            AU${jobDetails?.payment?.escrow || 267.2} will reach within 24 hours.
                        </p>
                    </div>
                }
                description={null}
                primaryLabel=""
                primaryVariant="success"
                onPrimary={() => {
                    setEscrowStatus("Released");
                    setIsSuccessModalOpen(false);
                }}
                hideSecondary={true}
                hideFooter={true}
            />
        </div>
    );
}

// Minimal PDF builder (no external deps) for quick invoice export
function buildInvoicePdf(job) {
    const jobId = job?.jobId || job?.id || "—";
    const customer = job?.customer || {};
    const cleaner = job?.cleaner || {};
    const payment = job?.payment || {};

    const lines = [
        `Invoice`,
        `Job ID: ${jobId}`,
        `Customer: ${customer.name || "—"} (${customer.email || customer.phone || "-"})`,
        `Cleaner: ${cleaner.name || "—"}`,
        `Amount Paid: AU$${payment.amountPaid ?? payment.amount ?? "0"}`,
        `Platform Fees: AU$${payment.platformFees ?? "0"}`,
        `GST: AU$${payment.gst ?? "0"}`,
        `Escrow Release: AU$${payment.escrow ?? "0"}`,
        `Release Date: ${payment.releaseDate || payment.escrowReleased || "—"}`,
    ];

    const escapeText = (txt) =>
        String(txt)
            .replace(/\\/g, "\\\\")
            .replace(/\(/g, "\\(")
            .replace(/\)/g, "\\)")
            .replace(/\r?\n/g, " ");

    let content = "BT\n/F1 12 Tf\n50 780 Td\n";
    lines.forEach((line, idx) => {
        content += `(${escapeText(line)}) Tj\n0 -18 Td\n`;
    });
    content += "ET";

    const contentLength = content.length;

    const objects = [];
    const addObject = (body) => {
        const offset = objects.reduce((sum, obj) => sum + obj.length, header.length);
        objects.push({ offset, body });
    };

    const header = "%PDF-1.4\n";

    addObject("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
    addObject("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
    addObject(
        "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 5 0 R /Resources << /Font << /F1 4 0 R >> >> >>\nendobj\n"
    );
    addObject("4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");
    addObject(`5 0 obj\n<< /Length ${contentLength} >>\nstream\n${content}\nendstream\nendobj\n`);

    // Recompute offsets now that we know bodies
    let offset = header.length;
    const offsets = [0]; // object 0 is free
    const bodyStrings = objects.map((obj, idx) => {
        const body = obj.body;
        offsets.push(offset);
        offset += body.length;
        return body;
    });

    let pdf = header + bodyStrings.join("");

    const xrefStart = pdf.length;
    let xref = `xref\n0 ${offsets.length}\n`;
    offsets.forEach((off) => {
        xref += `${off.toString().padStart(10, "0")} 00000 n \n`;
    });

    const trailer = `trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

    pdf += xref + trailer;
    return pdf;
}

