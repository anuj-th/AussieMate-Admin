import { useEffect } from "react";
import { X, ArrowUp } from "lucide-react";

export default function TransactionDetailModal({ isOpen, onClose, transaction }) {
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

  if (!isOpen || !transaction) return null;

  const formatCurrency = (value) => `AU$${Number(value || 0).toLocaleString()}`;

  const formatDateTime = (date) => {
    if (!date) return "-";
    try {
      const dateObj = new Date(date);
      if (Number.isNaN(dateObj.getTime())) return date;
      // Format: DD-MM-YYYY HH:MM
      const day = String(dateObj.getDate()).padStart(2, "0");
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const year = dateObj.getFullYear();
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");
      // Check if time is midnight (likely just a date without time)
      if (hours === "00" && minutes === "00") {
        return `${day}-${month}-${year}`;
      }
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    } catch {
      return date;
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Released: {
        dot: "bg-[#17C653]",
        text: "text-[#17C653]",
        bg: "bg-[#EAFFF1]",
        border: "border-[#17C65333]",
      },
      Held: {
        dot: "bg-[#F6B100]",
        text: "text-[#F6B100]",
        bg: "bg-[#FFF8DD]",
        border: "border-[#F6B10033]",
      },
      Failed: {
        dot: "bg-[#EF4444]",
        text: "text-[#EF4444]",
        bg: "bg-[#FEE2E2]",
        border: "border-[#EF444433]",
      },
    };

    const config = statusConfig[status] || statusConfig.Released;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.text} text-xs font-medium`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {status}
      </span>
    );
  };

  // Calculate fees (assuming platform fee is 15% and GST is 10% of platform fee)
  const platformFee = transaction.totalAmount * 0.15;
  const gstFee = platformFee * 0.1;
  const totalPayable = transaction.payableAmount || transaction.totalAmount - platformFee - gstFee;

  const handleExportHistory = () => {
    // TODO: Implement export history functionality
    console.log("Export history for transaction:", transaction.transactionId);
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
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-primary mb-1">
              {transaction.jobId}
            </h2>
            <p className="text-sm text-primary-light">
              Transaction ID: {transaction.transactionId}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportHistory}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            >
              <ArrowUp size={16} />
              Export history
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Transaction Content */}
        <div className="px-6 py-6">
          {/* Payment Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-primary mb-4">Payment</h3>
            
            <div className="space-y-3">
              {/* Job ID */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">Job ID:</span>
                <span className="text-sm font-medium text-primary">
                  {transaction.jobId}
                </span>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">Transaction ID:</span>
                <span className="text-sm font-medium text-primary">
                  {transaction.transactionId}
                </span>
              </div>

              {/* Customer */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">Customer:</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary block">
                    {transaction.customer?.name || "N/A"}
                  </span>
                  {transaction.customer?.email && (
                    <span className="text-sm text-primary-light">
                      {transaction.customer.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Cleaner */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">Cleaner:</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary block">
                    {transaction.cleaner?.name || "N/A"}
                  </span>
                  {transaction.cleaner?.email && (
                    <span className="text-sm text-primary-light">
                      {transaction.cleaner.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount Paid */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">Amount Paid:</span>
                <span className="text-sm font-medium text-primary">
                  {formatCurrency(transaction.totalAmount)}
                </span>
              </div>

              {/* Platform Fee */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">Platform Fee:</span>
                <span className="text-sm font-medium text-primary">
                  {formatCurrency(platformFee)}
                </span>
              </div>

              {/* GST Fee */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">GST Fee:</span>
                <span className="text-sm font-medium text-primary">
                  {formatCurrency(gstFee)}
                </span>
              </div>

              {/* Total Payable */}
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-primary-light">Total Payable:</span>
                <span className="text-sm font-medium text-primary">
                  {formatCurrency(totalPayable)}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-primary-light">Status:</span>
                <div className="flex items-center gap-2">
                  {getStatusBadge(transaction.status)}
                  {transaction.date && (
                    <span className="text-sm text-primary-light">
                      on {formatDateTime(transaction.date)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

