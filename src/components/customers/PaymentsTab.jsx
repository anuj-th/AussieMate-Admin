import { useEffect, useMemo, useRef, useState } from "react";
import {
    Calendar,
    ChevronDown,
    ChevronUp,
    CreditCard,
    MoreVertical,
    ShieldCheck,
    Wallet,
    Clock,
    FileText,
    Upload,
    CheckCircle2,
} from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";
import CustomMenu from "../common/CustomMenu";
import InvoiceModal from "../common/InvoiceModal";
import PaginationRanges from "../common/PaginationRanges";
import ReleaseFundsModal from "../common/ReleaseFundsModal";
import ActionModal from "../common/ActionModal";
import tableSortIcon from "../../assets/icon/tableSort.svg";

const defaultPayments = [
    {
        id: 1,
        jobId: "AM-20250919-001",
        service: "Cleaning • Bond Cleaning",
        amount: 320,
        status: "Escrowed",
        date: "2025-09-19",
        paymentMode: "Online",
        paymentMethod: "Visa •••• 1234",
    },
    {
        id: 2,
        jobId: "AM-20250810-014",
        service: "Housekeeping",
        amount: 220,
        status: "Held",
        date: "2025-08-10",
        paymentMode: "Cash",
        paymentMethod: "Visa •••• 1234",
    },
    {
        id: 3,
        jobId: "AM-20250810-015",
        service: "Bond Cleaning",
        amount: 220,
        status: "Released",
        date: "2025-08-10",
        paymentMode: "Cash",
        paymentMethod: "Visa •••• 1234",
    },
    {
        id: 4,
        jobId: "AM-20250810-016",
        service: "Cleaning • Deep Clean",
        amount: 220,
        status: "Released",
        date: "2025-08-10",
        paymentMode: "Cash",
        paymentMethod: "Visa •••• 1234",
    },
    {
        id: 5,
        jobId: "AM-20250810-017",
        service: "Pet Sitter",
        amount: 220,
        status: "Released",
        date: "2025-08-10",
        paymentMode: "Cash",
        paymentMethod: "Visa •••• 1234",
    },
];

export default function PaymentsTab({ customer }) {
    const [payments, setPayments] = useState(
        customer?.payments && customer.payments.length ? customer.payments : defaultPayments
    );
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [paymentModeFilter, setPaymentModeFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [releaseModalOpen, setReleaseModalOpen] = useState(false);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [activePayment, setActivePayment] = useState(null);
    const tableRef = useRef(null);

    const statusOptions = ["Escrowed", "Released"];

    useEffect(() => {
        const nextPayments =
            customer?.payments && customer.payments.length ? customer.payments : defaultPayments;
        setPayments(nextPayments);
        setSelectedRows([]);
        setSelectAll(false);
        setCurrentPage(1);
    }, [customer]);

    const formatCurrency = (value) => `AU$${Number(value || 0).toLocaleString()}`;

    const formatDate = (value) => {
        if (!value) return "-";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toISOString().split("T")[0];
    };

    const totalSpend = useMemo(
        () => payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
        [payments]
    );

    const activeEscrowAmount = useMemo(
        () =>
            payments
                .filter((payment) =>
                    ["escrowed", "held"].includes((payment.status || "").toLowerCase())
                )
                .reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
        [payments]
    );

    const activeEscrowJob =
        payments.find((payment) =>
            ["escrowed", "held"].includes((payment.status || "").toLowerCase())
        ) || {};

    const primaryPaymentMethod =
        customer?.paymentMethod ||
        customer?.preferredPaymentMethod ||
        activeEscrowJob.paymentMethod ||
        "Visa **** 1234";

    const paymentModeOptions = ["Online", "Cash"];

    const mappedPayment = useMemo(() => {
        if (!activePayment) return null;
        return {
            jobId: activePayment.jobId || `PAY-${activePayment.id}`,
            cleaner: {
                name: activePayment.cleaner?.name || activePayment.service || "Cleaner",
                avatar: activePayment.cleaner?.avatar,
            },
            payment: {
                amountPaid: activePayment.amount ?? 0,
                platformFees: activePayment.platformFees ?? 0,
                gst: activePayment.gst ?? 0,
                escrow: activePayment.escrow ?? activePayment.amount ?? 0,
                releaseDate: activePayment.date,
            },
        };
    }, [activePayment]);

    const filteredPayments = useMemo(() => {
        return payments.filter((payment) => {
            const matchesSearch =
                !searchQuery ||
                payment.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                payment.service.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = !statusFilter || payment.status === statusFilter;
            const matchesPaymentMode =
                !paymentModeFilter || payment.paymentMode === paymentModeFilter;

            return matchesSearch && matchesStatus && matchesPaymentMode;
        });
    }, [payments, searchQuery, statusFilter, paymentModeFilter]);

    const sortedPayments = useMemo(() => {
        return [...filteredPayments].sort((a, b) => {
            if (!sortColumn) return 0;

            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            if (sortColumn === "amount") {
                aValue = Number(aValue);
                bValue = Number(bValue);
            } else if (sortColumn === "date") {
                aValue = new Date(aValue || "");
                bValue = new Date(bValue || "");
            }

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredPayments, sortColumn, sortDirection]);

    const paginatedPayments = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedPayments.slice(startIndex, endIndex);
    }, [sortedPayments, currentPage, itemsPerPage]);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            const pageIds = paginatedPayments.map((payment) => payment.id);
            setSelectedRows([...new Set([...selectedRows, ...pageIds])]);
        } else {
            const pageIds = paginatedPayments.map((payment) => payment.id);
            setSelectedRows(selectedRows.filter((id) => !pageIds.includes(id)));
        }
    };

    const handleSelectRow = (id, checked) => {
        if (checked) {
            setSelectedRows([...selectedRows, id]);
        } else {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        }
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const getSortIcon = (column) => {
        if (sortColumn !== column) return null;
        return sortDirection === "asc" ? (
            <ChevronUp size={14} className="text-gray-400" />
        ) : (
            <ChevronDown size={14} className="text-gray-400" />
        );
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

    const handleApprovePayout = (payment) => {
        setActivePayment(payment);
        setReleaseModalOpen(true);
    };

    const handleViewInvoice = (payment) => {
        setSelectedInvoice(payment);
    };

    const handleExportPayoutReport = (payment) => {
        if (!payment) return;
        const headers = [
            "Job ID",
            "Service",
            "Amount",
            "Status",
            "Date",
            "Payment Mode",
            "Payment Method",
        ];

        const row = [
            payment.jobId || `PAY-${payment.id}`,
            payment.service || "",
            `AU$${formatCurrency(payment.amount || 0)}`,
            payment.status || "",
            formatDate(payment.date),
            payment.paymentMode || "",
            payment.paymentMethod || "",
        ];

        const csv = [headers.join(","), row.join(",")].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${payment.jobId || `payout-${payment.id}`}-report.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const closeInvoiceModal = () => {
        setSelectedInvoice(null);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, paymentModeFilter, itemsPerPage]);

    const handleExportHistory = () => {
        if (!tableRef.current) return;
        const printWindow = window.open("", "", "width=1200,height=800");
        if (!printWindow) return;

        const styles = `
      <style>
        body { font-family: Arial, sans-serif; margin: 16px; color: #111827; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 10px 12px; border: 1px solid #e5e7eb; text-align: left; font-size: 13px; }
        th { background: #f9fafb; font-weight: 600; }
        .status-pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-weight: 600; font-size: 12px; border: 1px solid #e5e7eb; }
        .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
      </style>
    `;

        const tableHtml = tableRef.current.innerHTML;
        printWindow.document.write(
            `<html><head><title>Payments & Escrow</title>${styles}</head><body>${tableHtml}</body></html>`
        );
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-white border border-[#EEF0F5] rounded-2xl shadow-sm p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8F1FF] flex items-center justify-center flex-shrink-0">
                        <Wallet size={20} className="text-[#1F6FEB]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-semibold text-primary">
                            {formatCurrency(totalSpend)}
                        </span>
                        <span className="text-sm text-primary-light">Total Spend</span>
                    </div>
                </div>

                <div className="bg-white border border-[#EEF0F5] rounded-2xl shadow-sm p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8F1FF] flex items-center justify-center flex-shrink-0">
                        <ShieldCheck size={20} className="text-[#1F6FEB]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-semibold text-primary">
                            {formatCurrency(activeEscrowAmount)}
                        </span>
                        <span className="text-sm text-primary-light">
                            Active Escrow {activeEscrowJob.jobId ? `(Job ${activeEscrowJob.jobId})` : ""}
                        </span>
                    </div>
                </div>

                <div className="bg-white border border-[#EEF0F5] rounded-2xl shadow-sm p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8F1FF] flex items-center justify-center flex-shrink-0">
                        <CreditCard size={20} className="text-[#1F6FEB]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-semibold text-primary">{primaryPaymentMethod}</span>
                        <span className="text-sm text-primary-light">Payment Method</span>
                    </div>
                </div>
            </div>
            <h3 className="font-semibold text-primary">Payment History</h3>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-3 md:p-4 border-b border-gray-200">

                    <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-stretch xl:items-center justify-between">
                        <h3 className="font-semibold text-primary">Payment History</h3>

                        <div className="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-row xl:flex-nowrap gap-2 md:gap-3">
                            <div>
                                <SearchInput
                                    placeholder="Search by Job ID or Service"
                                    onChange={setSearchQuery}
                                    className="md:w-[300px]"
                                />
                            </div>
                            <div className="w-full sm:w-40">
                                <CustomSelect
                                    value={paymentModeFilter}
                                    onChange={setPaymentModeFilter}
                                    placeholder="Payment Mode"
                                    options={paymentModeOptions}
                                    className="w-full"
                                />
                            </div>
                            <div className="w-full sm:w-40">
                                <CustomSelect
                                    value={statusFilter}
                                    onChange={setStatusFilter}
                                    placeholder="Status"
                                    options={statusOptions}
                                    className="w-full"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleExportHistory}
                                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                            >
                                <Upload size={16} className="text-gray-600" />
                                Export history
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto" ref={tableRef}>
                    <table className="w-full border-collapse min-w-[780px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div className="flex items-center justify-center">
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                    </div>
                                </th>
                                <th className="min-w-[140px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div
                                        className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                        onClick={() => handleSort("date")}
                                    >
                                        <span className="font-medium text-gray-700 text-xs md:text-xs">Date</span>
                                        <img
                                            src={tableSortIcon}
                                            alt="sort"
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                        />
                                        {getSortIcon("date")}
                                    </div>
                                </th>
                                <th className="min-w-[140px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div
                                        className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                        onClick={() => handleSort("amount")}
                                    >
                                        <span className="font-medium text-gray-700 text-xs md:text-xs">Amount</span>
                                        <img
                                            src={tableSortIcon}
                                            alt="sort"
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                        />
                                        {getSortIcon("amount")}
                                    </div>
                                </th>
                                <th className="min-w-[160px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div
                                        className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                        onClick={() => handleSort("paymentMode")}
                                    >
                                        <span className="font-medium text-gray-700 text-xs md:text-xs">
                                            Payment Mode
                                        </span>
                                        <img
                                            src={tableSortIcon}
                                            alt="sort"
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                        />
                                        {getSortIcon("paymentMode")}
                                    </div>
                                </th>
                                <th className="min-w-[140px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <span className="font-medium text-gray-700 text-xs md:text-xs">Status</span>
                                </th>
                                <th className="w-14 md:w-16 px-2 md:px-4 py-2 md:py-3 text-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPayments.map((payment) => (
                                <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <div className="flex items-center justify-center">
                                            <Checkbox
                                                checked={selectedRows.includes(payment.id)}
                                                onChange={(e) => handleSelectRow(payment.id, e.target.checked)}
                                            />
                                        </div>
                                    </td>
                                    <td className="min-w-[140px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-primary-light flex-shrink-0" />
                                            <p className="text-sm text-primary font-medium">{formatDate(payment.date)}</p>
                                        </div>
                                    </td>
                                    <td className="min-w-[140px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <p className="text-sm font-medium text-primary">
                                            {formatCurrency(payment.amount)}
                                        </p>
                                    </td>
                                    <td className="min-w-[160px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <p className="text-sm text-primary font-medium">
                                            {payment.paymentMode || payment.paymentMethod}
                                        </p>
                                    </td>
                                    <td className="min-w-[140px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        {getStatusBadge(payment.status)}
                                    </td>
                                    <td className="w-14 md:w-16 px-2 md:px-4 py-2 md:py-4 text-center">
                                        <CustomMenu
                                            // title="Menu"
                                            align="right"
                                            items={[
                                                {
                                                    id: "approve",
                                                    label: "Approve Payout",
                                                    icon: <CheckCircle2 size={18} className="text-[#1F6FEB]" />,
                                                    onClick: () => handleApprovePayout(payment),
                                                },
                                                {
                                                    id: "export",
                                                    label: "Export Payout Report",
                                                    icon: <Upload size={18} className="text-[#6B7280]" />,
                                                    onClick: () => handleExportPayoutReport(payment),
                                                },
                                            ]}
                                            trigger={
                                                <button
                                                    type="button"
                                                    className="p-2 inline-flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-md"
                                                >
                                                    <MoreVertical size={16} className="text-[#78829D]" />
                                                </button>
                                            }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PaginationRanges
                    currentPage={currentPage}
                    rowsPerPage={itemsPerPage}
                    totalItems={filteredPayments.length}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setItemsPerPage}
                />
            </div>

            {/* Invoice Modal */}
            <InvoiceModal
                isOpen={!!selectedInvoice}
                onClose={closeInvoiceModal}
                invoice={selectedInvoice}
            />

            {/* Release modal */}
            <ReleaseFundsModal
                isOpen={releaseModalOpen}
                onClose={() => setReleaseModalOpen(false)}
                onConfirm={() => {
                    setReleaseModalOpen(false);
                    setSuccessModalOpen(true);
                }}
                jobDetails={mappedPayment}
            />

            {/* Success modal */}
            <ActionModal
                isOpen={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                illustration={null}
                title={
                    <div className="space-y-2 text-center">
                        <p className="text-lg sm:text-xl font-semibold text-[#111827]">
                            Payout Approved
                        </p>
                        <p className="text-sm sm:text-base text-[#6B7280]">
                            AU${activePayment?.amount ?? 0} will reach the cleaner within 24 hours.
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


