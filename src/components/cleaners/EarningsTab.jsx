import { useMemo, useState } from "react";
import CustomMenu from "../common/CustomMenu";
import ActionModal from "../common/ActionModal";
import ReleaseFundsModal from "../common/ReleaseFundsModal";
import { DollarSign, CheckCircle2, Upload } from "lucide-react";
import camelIllustration from "../../assets/image/camel.svg";

// Pending payouts are derived from "In Progress" jobs for this cleaner.

export default function EarningsTab({ cleaner, totalEarnings, jobs = [] }) {
    const safeTotalEarnings =
        totalEarnings !== undefined && totalEarnings !== null
            ? Number(totalEarnings || 0)
            : Number(cleaner?.earnings || 0);
    const pendingPayouts = useMemo(() => {
        // Derived from jobs passed from CleanerDetails (already fetched from /admin/cleaners/:id/jobs)
        if (!Array.isArray(jobs) || jobs.length === 0) return [];

        const inProgress = jobs.filter((j) => (j?.status || "").toString() === "In Progress");
        return inProgress.map((j) => ({
            id: j._id || j.id || j.jobId,
            type: j.type || "Job",
            subType: j.subType || "Service",
            amount: Number(j.amount ?? j.cleanerQuote?.price ?? j.acceptedQuoteId?.price ?? 0) || 0,
            date: (j.joined || "").toString() || "N/A",
            // keep original job if you later want to open details
            _job: j,
        }));
    }, [jobs]);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [activePayout, setActivePayout] = useState(null);
    const [releaseModalOpen, setReleaseModalOpen] = useState(false);

    const mappedPayout = useMemo(() => {
        if (!activePayout) return null;
        return {
            jobId: activePayout.id ? `PAY-${activePayout.id}` : "Payout",
            cleaner: {
                name: cleaner?.name || "Cleaner",
                avatar: cleaner?.avatar,
            },
            payment: {
                amountPaid: activePayout.amount ?? 0,
                platformFees: activePayout.platformFees ?? 0,
                gst: activePayout.gst ?? 0,
                escrow: activePayout.escrow ?? activePayout.amount ?? 0,
                releaseDate: activePayout.date || activePayout.releaseDate,
            },
        };
    }, [activePayout, cleaner]);

    return (
        <div className="space-y-6">
            {/* Total Earnings Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 md:gap-4 shadow-sm">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#F9F9F9] border border-[#E5E7EB] flex items-center justify-center flex-shrink-0">
                    <DollarSign size={24} className="md:w-7 md:h-7 text-[#2563EB]" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold text-primary">
                        AU${safeTotalEarnings.toLocaleString()}
                    </p>
                    <p className="text-sm font-medium text-primary-light ">
                        Total Earnings
                    </p>
                </div>
            </div>

            {/* Pending Payouts Section */}
            <div className="space-y-4">
                <h3 className="font-semibold text-primary">
                    Pending Payouts
                </h3>

                <div className="space-y-3">
                    {pendingPayouts.map((payout) => (
                        <div
                            key={payout.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-primary ">
                                    {payout.type} • {payout.subType}
                                </p>
                                <p className="font-medium text-primary mb-1">
                                    AU${payout.amount.toLocaleString()}
                                </p>
                                <p className="text-xs text-primary-light font-medium ">
                                    {payout.date}
                                </p>
                            </div>

                            {/* Menu Icon */}
                            <div className="flex-shrink-0">
                                <CustomMenu
                                    align="right"
                                    items={[
                                        {
                                            id: "approve",
                                            label: "Approve Payout",
                                            icon: (
                                                <CheckCircle2 className="w-5 h-5 text-[#1F6FEB]" />
                                            ),
                                            onClick: () => {
                                                setActivePayout(payout);
                                                setReleaseModalOpen(true);
                                            },
                                        },
                                        {
                                            id: "export",
                                            label: "Export Payout Report",
                                            icon: <Upload className="w-5 h-5 text-[#6B7280]" />,
                                            onClick: () => {
                                                const printWindow = window.open("", "", "width=800,height=800");
                                                if (!printWindow) return;

                                                const cleanerName = cleaner?.name || "Cleaner";
                                                const amount = payout.amount || 0;
                                                const platformFee = Math.round(amount * 0.15 * 100) / 100;
                                                const gst = Math.round(amount * 0.10 * 100) / 100;
                                                const netAmount = Math.max(amount - platformFee - gst, 0);

                                                const styles = `
                                                    <style>
                                                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
                                                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #1f2937; line-height: 1.6; background-color: white; }
                                                        .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; border-bottom: 2px solid #f3f4f6; padding-bottom: 20px; }
                                                        .invoice-title { font-size: 24px; font-weight: 600; color: #111827; }
                                                        .company-info { text-align: right; font-size: 14px; color: #6b7280; }
                                                        .section { margin-bottom: 30px; }
                                                        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; }
                                                        .label { font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
                                                        .value { font-size: 15px; color: #111827; font-weight: 500; }
                                                        .payout-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                                                        .payout-table th { background-color: #f9fafb; text-align: left; padding: 12px 16px; font-size: 12px; border-bottom: 1px solid #e5e7eb; color: #4b5563; }
                                                        .payout-table td { padding: 16px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #374151; }
                                                        .totals { margin-top: 30px; margin-left: auto; width: 300px; }
                                                        .total-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
                                                        .total-row.grand-total { margin-top: 10px; padding-top: 15px; border-top: 2px solid #111827; font-size: 18px; font-weight: 600; color: #111827; }
                                                        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: #FFF8DD; color: #F6B100; font-size: 12px; font-weight: 600; }
                                                        @media print { body { padding: 0; } }
                                                    </style>
                                                `;

                                                const html = `
                                                    <!DOCTYPE html>
                                                    <html>
                                                        <head>
                                                            <title>Payout Report - ${payout.id}</title>
                                                            ${styles}
                                                        </head>
                                                        <body>
                                                            <div class="invoice-header">
                                                                <div>
                                                                    <div class="invoice-title">Payout Advice</div>
                                                                    <p class="value">Report ID: PAY-${payout.id}</p>
                                                                </div>
                                                                <div class="company-info">
                                                                    <div class="value">AussieMate Admin</div>
                                                                    <p>${new Date().toLocaleDateString()}</p>
                                                                </div>
                                                            </div>

                                                            <div class="grid section">
                                                                <div>
                                                                    <div class="label">Payee Details</div>
                                                                    <div class="value">${cleanerName}</div>
                                                                    <div class="value">Cleaner Profile ID: ${cleaner?.id || "N/A"}</div>
                                                                </div>
                                                                <div>
                                                                    <div class="label">Payout Status</div>
                                                                    <div class="status-badge">Pending Approval</div>
                                                                </div>
                                                            </div>

                                                            <table class="payout-table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Service Description</th>
                                                                        <th>Service Date</th>
                                                                        <th style="text-align: right">Total Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>${payout.type} • ${payout.subType}</td>
                                                                        <td>${payout.date}</td>
                                                                        <td style="text-align: right">AU$${amount.toLocaleString()}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>

                                                            <div class="totals">
                                                                <div class="total-row">
                                                                    <span class="label">Gross Payout</span>
                                                                    <span class="value">AU$${amount.toLocaleString()}</span>
                                                                </div>
                                                                <div class="total-row">
                                                                    <span class="label">Platform Fee (15%)</span>
                                                                    <span class="value text-red-500">- AU$${platformFee.toLocaleString()}</span>
                                                                </div>
                                                                <div class="total-row">
                                                                    <span class="label">GST (10%)</span>
                                                                    <span class="value">- AU$${gst.toLocaleString()}</span>
                                                                </div>
                                                                <div class="total-row grand-total">
                                                                    <span>Net Payout</span>
                                                                    <span>AU$${netAmount.toLocaleString()}</span>
                                                                </div>
                                                            </div>

                                                            <div style="margin-top: 100px; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; padding-top: 10px;">
                                                                This is a computer-generated payout advice and does not require a signature.
                                                            </div>
                                                        </body>
                                                    </html>
                                                `;

                                                printWindow.document.write(html);
                                                printWindow.document.close();
                                                setTimeout(() => {
                                                    printWindow.focus();
                                                    printWindow.print();
                                                    printWindow.close();
                                                }, 300);
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    ))}

                    {pendingPayouts.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-sm md:text-base text-primary-light">
                                No pending payouts
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Release / Approve modal (reuses ReleaseFundsModal) */}
            <ReleaseFundsModal
                isOpen={releaseModalOpen}
                onClose={() => setReleaseModalOpen(false)}
                onConfirm={() => {
                    setReleaseModalOpen(false);
                    setSuccessModalOpen(true);
                }}
                jobDetails={mappedPayout}
            />

            {/* Success modal */}
            <ActionModal
                isOpen={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                illustration={
                    <div className="flex flex-col items-center">
                        <img
                            src={camelIllustration}
                            alt="Payout success"
                            className="w-40 sm:w-48 h-auto object-contain"
                        />
                    </div>
                }
                title={
                    <div className="space-y-2 text-center">
                        <p className="text-sm sm:text-base font-semibold text-[#111827]">
                            Payout Approved
                        </p>
                        <p className="text-lg sm:text-xl font-semibold text-[#111827]">
                            {activePayout?.type || "Payout"} – {activePayout?.subType || ""}
                        </p>
                        <p className="text-sm sm:text-base text-[#6B7280]">
                            AU${activePayout?.amount ?? 0} will reach the cleaner within 24 hours.
                        </p>
                    </div>
                }
                description={null}
                hideSecondary
                hideFooter
                primaryLabel=""
            />
        </div>
    );
}
