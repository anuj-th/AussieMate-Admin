import { useEffect } from "react";
import { X, ArrowUp, Upload } from "lucide-react";

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
        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border text-[10px] sm:text-xs font-medium ${config.bg} ${config.border} ${config.text}`}
      >
        <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${config.dot}`} />
        {status}
      </span>
    );
  };

  // Calculate fees (assuming platform fee is 15% and GST is 10% of platform fee)
  const platformFee = transaction.totalAmount * 0.15;
  const gstFee = platformFee * 0.1;
  const totalPayable = transaction.payableAmount || transaction.totalAmount - platformFee - gstFee;

  const handleExportHistory = () => {
    try {
      // Prepare CSV data
      const csvRows = [
        ["Transaction Details"],
        [],
        ["Job ID", transaction.jobId],
        ["Transaction ID", transaction.transactionId],
        ["Customer Name", transaction.customer?.name || "N/A"],
        ["Customer Email", transaction.customer?.email || "N/A"],
        ["Cleaner Name", transaction.cleaner?.name || "N/A"],
        ["Cleaner Email", transaction.cleaner?.email || "N/A"],
        ["Amount Paid", formatCurrency(transaction.totalAmount)],
        ["Platform Fee", formatCurrency(platformFee)],
        ["GST Fee", formatCurrency(gstFee)],
        ["Total Payable", formatCurrency(totalPayable)],
        ["Status", transaction.status],
        ["Date", transaction.date ? formatDateTime(transaction.date) : "N/A"],
      ];

      // Convert to CSV format
      const csvContent = csvRows
        .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
        .join("\n");

      // Create blob and download
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `Transaction_${transaction.transactionId}_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting transaction history:", error);
      alert("Failed to export transaction history. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2 sm:px-3 md:px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 pt-4 sm:pt-5 md:pt-6 relative z-10 w-full max-w-2xl rounded-xl sm:rounded-2xl bg-white shadow-xl border border-gray flex flex-col overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 bg-white sticky top-0 pb-3 sm:pb-0">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-primary truncate">
              {transaction.jobId}
            </h2>
            <p className="text-[10px] sm:text-xs md:text-sm text-primary-light truncate">
              Transaction ID: {transaction.transactionId}
            </p>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleExportHistory}
              className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-2.5 md:px-3 lg:px-4 py-1.5 sm:py-2 rounded-lg border border-gray-300 text-[10px] sm:text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Upload size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-600 flex-shrink-0" />
              <span className="hidden sm:inline">Export history</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 flex-shrink-0"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
            </button>
          </div>
        </div>

        {/* Transaction Content */}
        <div className="pb-4 sm:pb-6">
          {/* Payment Section */}
          <div className="mb-4 sm:mb-6 border border-gray-200 rounded-lg sm:rounded-xl mt-3 sm:mt-4">
            <h3 className="font-medium text-sm sm:text-base text-primary px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 border-b border-gray-200">
              Payment
            </h3>
            
            <div className="">
              {/* Job ID */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 border-b border-gray-200 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Job ID:
                </span>
                <span className="text-xs sm:text-sm font-medium text-primary break-all sm:break-normal text-end sm:text-left">
                  {transaction.jobId}
                </span>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 border-b border-gray-200 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Transaction ID:
                </span>
                <span className="text-xs sm:text-sm font-medium text-primary break-all sm:break-normal text-end sm:text-left">
                  {transaction.transactionId}
                </span>
              </div>

              {/* Customer */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 border-b border-gray-200 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Customer:
                </span>
                <div className="flex flex-wrap items-center gap-1 min-w-0 text-end sm:text-left sm:justify-start justify-end">
                  <span className="text-xs sm:text-sm font-medium text-primary">
                    {transaction.customer?.name || "N/A"}
                  </span>
                  {transaction.customer?.email && (
                    <span className="text-xs sm:text-sm text-primary-light break-all sm:break-normal">
                      - {transaction.customer.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Cleaner */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 border-b border-gray-200 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Cleaner:
                </span>
                <div className="flex flex-wrap items-center gap-1 min-w-0 text-end sm:text-left sm:justify-start justify-end">
                  <span className="text-xs sm:text-sm font-medium text-primary">
                    {transaction.cleaner?.name || "N/A"}
                  </span>
                  {transaction.cleaner?.email && (
                    <span className="text-xs sm:text-sm text-primary-light break-all sm:break-normal">
                      - {transaction.cleaner.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Amount Paid */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 border-b border-gray-200">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Amount Paid:
                </span>
                <span className="text-xs sm:text-sm font-medium text-primary text-end sm:text-left">
                  {formatCurrency(transaction.totalAmount)}
                </span>
              </div>

              {/* Platform Fee */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 border-b border-gray-200">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Platform Fee:
                </span>
                <span className="text-xs sm:text-sm font-medium text-primary text-end sm:text-left">
                  {formatCurrency(platformFee)}
                </span>
              </div>

              {/* GST Fee */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 border-b border-gray-200">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  GST Fee:
                </span>
                <span className="text-xs sm:text-sm font-medium text-primary text-end sm:text-left">
                  {formatCurrency(gstFee)}
                </span>
              </div>

              {/* Total Payable */}
              <div className="flex justify-between sm:justify-start gap-1 sm:gap-0 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3 border-b border-gray-200">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Total Payable:
                </span>
                <span className="text-xs sm:text-sm font-medium text-primary text-end sm:text-left">
                  {formatCurrency(totalPayable)}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between sm:justify-start gap-2 sm:gap-0 px-3 sm:px-5 md:px-7 py-2.5 sm:py-3">
                <span className="text-xs sm:text-sm text-primary-light font-medium sm:w-32 md:w-36 flex-shrink-0">
                  Status:
                </span>
                <div className="flex flex-wrap items-center gap-2 min-w-0 justify-end sm:justify-start">
                  {getStatusBadge(transaction.status)}
                  {transaction.date && (
                    <span className="text-xs sm:text-sm text-primary-light whitespace-nowrap">
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

