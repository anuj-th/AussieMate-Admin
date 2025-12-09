import CustomMenu from "../common/CustomMenu";
import { DollarSign } from "lucide-react";

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
                                <p className="font-semibold text-primary">
                                    {payout.type} • {payout.subType}
                                </p>
                                <p className="font-medium text-primary mb-1">
                                    AU${payout.amount.toLocaleString()}
                                </p>
                                <p className="text-sm text-primary-light font-medium">
                                    {payout.date}
                                </p>
                            </div>

                            {/* Menu Icon */}
                            <div className="flex-shrink-0">
                                <CustomMenu
                                    align="right"
                                    items={[
                                        {
                                            id: "view",
                                            label: "View Details",
                                            onClick: () => {
                                                // TODO: Handle view details
                                                console.log("View payout details", payout.id);
                                            },
                                        },
                                        {
                                            id: "process",
                                            label: "Process Payout",
                                            onClick: () => {
                                                // TODO: Handle process payout
                                                console.log("Process payout", payout.id);
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
        </div>
    );
}
