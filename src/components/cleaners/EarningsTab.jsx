import { useMemo, useState } from "react";
import CustomMenu from "../common/CustomMenu";
import ActionModal from "../common/ActionModal";
import ReleaseFundsModal from "../common/ReleaseFundsModal";
import { DollarSign, CheckCircle2, Upload } from "lucide-react";
import camelIllustration from "../../assets/image/camel.svg";

// Sample pending payouts data
const pendingPayoutsData = [
    {
        id: 1,
        type: "Pet Sitter",
        subType: "Walking",
        amount: 1240,
        date: "10-09-2025",
    },
    {
        id: 2,
        type: "Pet Sitter",
        subType: "Feeding",
        amount: 1240,
        date: "10-09-2025",
    },
];

export default function EarningsTab({ cleaner }) {
    // Use cleaner data or fallback to defaults
    const totalEarnings = cleaner?.earnings || 12420;
    const pendingPayouts = pendingPayoutsData; // In real app, this would come from cleaner data
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
                        AU${totalEarnings.toLocaleString()}
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
                                                console.log("Export payout report", payout.id);
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
