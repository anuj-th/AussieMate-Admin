import { useEffect } from "react";
import { X } from "lucide-react";

export default function InvoiceModal({ isOpen, onClose, invoice }) {
    // Close on ESC key
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose?.();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen || !invoice) return null;

    const formatCurrency = (value) => `AU$${Number(value || 0).toLocaleString()}`;

    const formatDate = (value) => {
        if (!value) return "-";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toISOString().split("T")[0];
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            Escrowed: {
                bg: "bg-[#EBF2FD]",
                text: "text-[#2563EB]",
                border: "border-[#2563EB33]",
                dot: "bg-[#2563EB]",
            },
            Released: {
                bg: "bg-[#EAFFF1]",
                text: "text-[#17C653]",
                border: "border-[#17C65333]",
                dot: "bg-[#17C653]",
            },
            Held: {
                bg: "bg-[#FFF8DD]",
                text: "text-[#F6B100]",
                border: "border-[#F6B10033]",
                dot: "bg-[#F6B100]",
            },
            Pending: {
                bg: "bg-[#EBF2FD]",
                text: "text-[#2563EB]",
                border: "border-[#2563EB33]",
                dot: "bg-[#2563EB]",
            },
            Refunded: {
                bg: "bg-[#FEE2E2]",
                text: "text-[#EF4444]",
                border: "border-[#EF444433]",
                dot: "bg-[#EF4444]",
            },
        };

        const config = statusConfig[status] || statusConfig.Pending;

        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.bg} ${config.text} border ${config.border}`}
            >
                <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1 ${config.dot}`} />
                {status}
            </span>
        );
    };

    const handleDownload = () => {
        // TODO: Implement download invoice functionality
        console.log("Download invoice:", invoice.id);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 sm:px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Card */}
            <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white shadow-xl border border-[#E5E7EB] flex flex-col overflow-hidden max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white sticky top-0">
                    <h2 className="text-xl font-semibold text-primary">Invoice Details</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                {/* Invoice Content */}
                <div className="px-6 py-6 space-y-6">
                    {/* Invoice Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                        <div>
                            <h3 className="text-lg font-semibold text-primary mb-1">
                                Invoice #{invoice.jobId}
                            </h3>
                            <p className="text-sm text-primary-light">{invoice.service}</p>
                        </div>
                        <div className="text-right">
                            {getStatusBadge(invoice.status)}
                        </div>
                    </div>

                    {/* Invoice Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-sm font-semibold text-primary-light mb-3">
                                Payment Information
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-primary-light">Date:</span>
                                    <span className="text-sm font-medium text-primary">
                                        {formatDate(invoice.date)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-primary-light">Payment Mode:</span>
                                    <span className="text-sm font-medium text-primary">
                                        {invoice.paymentMode}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-primary-light">Payment Method:</span>
                                    <span className="text-sm font-medium text-primary">
                                        {invoice.paymentMethod}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-primary-light mb-3">
                                Amount Details
                            </h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-sm text-primary-light">Subtotal:</span>
                                    <span className="text-sm font-medium text-primary">
                                        {formatCurrency(invoice.amount)}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-primary-light">Tax (GST):</span>
                                    <span className="text-sm font-medium text-primary">
                                        {formatCurrency((invoice.amount * 0.1).toFixed(2))}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-[#E5E7EB]">
                                    <span className="text-base font-semibold text-primary">Total:</span>
                                    <span className="text-base font-semibold text-primary">
                                        {formatCurrency((invoice.amount * 1.1).toFixed(2))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Details */}
                    <div>
                        <h4 className="text-sm font-semibold text-primary-light mb-3">
                            Service Details
                        </h4>
                        <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB]">
                            <p className="text-sm text-primary">{invoice.service}</p>
                            <p className="text-xs text-primary-light mt-2">
                                Job ID: {invoice.jobId}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex justify-end gap-3 sticky bottom-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="px-4 py-2 rounded-lg bg-[#1F6FEB] hover:bg-[#1B63D6] text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]/30"
                    >
                        Download Invoice
                    </button>
                </div>
            </div>
        </div>
    );
}

