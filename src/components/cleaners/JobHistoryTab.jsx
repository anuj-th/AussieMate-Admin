import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronUp, ChevronDown, Upload, Eye } from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";

export default function JobHistoryTab({ cleaner, jobs = [], onViewJob }) {
    const [internalJobs, setInternalJobs] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");
    const tableRef = useRef(null);

    const statusOptions = ["In Progress", "Completed", "Rejected"];

    // If parent provides jobs, use them (dynamic).
    useEffect(() => {
        if (Array.isArray(jobs)) {
            setInternalJobs(jobs);
        }
    }, [jobs]);

    // Filter jobs based on search and filters
    const filteredJobs = useMemo(() => {
        return internalJobs.filter((job) => {
            const customerName = (job?.customer?.name || "").toString();
            const customerEmail = (job?.customer?.email || "").toString();
            const jobId = (job?.jobId || "").toString();
            const matchesSearch =
                !searchQuery ||
                jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = !statusFilter || job.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [internalJobs, searchQuery, statusFilter]);

    // Sort filtered jobs
    const sortedJobs = useMemo(() => {
        return [...filteredJobs].sort((a, b) => {
            if (!sortColumn) return 0;

            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            // Handle nested properties
            if (sortColumn === "customer") {
                aValue = (a.customer?.name || "").toString();
                bValue = (b.customer?.name || "").toString();
            } else if (sortColumn === "amount") {
                aValue = Number(aValue);
                bValue = Number(bValue);
            }

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredJobs, sortColumn, sortDirection]);

    // Paginate sorted jobs
    const paginatedJobs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedJobs.slice(startIndex, endIndex);
    }, [sortedJobs, currentPage, itemsPerPage]);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            const pageIds = paginatedJobs.map((job) => job.id);
            setSelectedRows([...new Set([...selectedRows, ...pageIds])]);
        } else {
            const pageIds = paginatedJobs.map((job) => job.id);
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

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return {
                    dot: "bg-[#17C653]",
                    text: "text-[#17C653]",
                    bg: "bg-[#EAFFF1]",
                    border: "border-[#17C65333]",
                };
            case "In Progress":
                return {
                    dot: "bg-[#F6B100]",
                    text: "text-[#F6B100]",
                    bg: "bg-[#FFF8DD]",
                    border: "border-[#F6B10033]",
                };
            case "Rejected":
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
            `<html><head><title>Job History</title>${styles}</head><body>${tableHtml}</body></html>`
        );
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, itemsPerPage]);

   return (
    <div className="px-4 py-4">
        {/* Header */}
        <h2 className="text-lg md:text-xl font-semibold text-primary mb-4">
            Job History
        </h2>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

            {/* Filters Section */}
            <div className="p-3 md:p-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center justify-between">

                    {/* Search */}
                    <div className="flex-1 md:max-w-[300px]">
                        <SearchInput
                            placeholder="Search by Name, ABN, Email, Role"
                            onChange={setSearchQuery}
                            className="w-full"
                        />
                    </div>

                    {/* Filters + Export */}
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 items-stretch sm:items-center">
                        <div className="w-full sm:w-auto sm:w-32">
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

            {/* Table Section */}
            <div className="overflow-x-auto" ref={tableRef}>
                <table className="w-full border-collapse min-w-[800px]">
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

                            {/* Job ID */}
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <span className="font-medium text-gray-700 text-xs md:text-sm">Job ID</span>
                            </th>

                            {/* Customer */}
                            <th className="min-w-[180px] md:min-w-[220px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <span className="font-medium text-gray-700 text-xs md:text-sm">Customer</span>
                            </th>

                            {/* Joined */}
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <span className="font-medium text-gray-700 text-xs md:text-sm">Joined</span>
                            </th>

                            {/* Amount */}
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <span className="font-medium text-gray-700 text-xs md:text-sm">Amount</span>
                            </th>
                            <th className="min-w-[120px] md:min-w-[140px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <span className="font-medium text-gray-700 text-xs md:text-sm">
                                    Status
                                </span>
                            </th>
                            <th className="w-14 md:w-16 px-2 md:px-4 py-2 md:py-3 text-center"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedJobs.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-4 py-10 text-center text-primary-light text-sm">
                                    No job history found
                                </td>
                            </tr>
                        ) : (
                            paginatedJobs.map((job) => {
                                const statusColors = getStatusColor(job.status);
                                return (
                                    <tr key={job.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">

                                    <td className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <div className="flex items-center justify-center">
                                            <Checkbox
                                                checked={selectedRows.includes(job.id)}
                                                onChange={(e) =>
                                                    handleSelectRow(job.id, e.target.checked)
                                                }
                                            />
                                        </div>
                                    </td>

                                    <td className="px-2 md:px-4 py-2 md:py-4 border-r border-gray-200 font-medium text-primary text-xs md:text-sm">
                                        {job.jobId}
                                    </td>

                                    <td className="px-2 md:px-4 py-2 md:py-4 border-r border-gray-200 font-medium text-primary text-xs md:text-sm">
                                        {job.customer?.name || "N/A"}
                                    </td>

                                    <td className="px-2 md:px-4 py-2 md:py-4 border-r border-gray-200 font-medium text-primary text-xs md:text-sm">
                                        {job.joined}
                                    </td>

                                    <td className="px-2 md:px-4 py-2 md:py-4 border-r border-gray-200 font-medium text-primary text-xs md:text-sm">
                                        AU${job.amount.toLocaleString()}
                                    </td>
                                    <td className="min-w-[120px] md:min-w-[140px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors.bg} ${statusColors.border} ${statusColors.text}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="w-14 md:w-16 px-2 md:px-4 py-2 md:py-4 text-center">
                                        <button
                                            type="button"
                                            className="p-2 inline-flex items-center justify-center cursor-pointer"
                                            onClick={() => onViewJob && onViewJob(job)}
                                        >
                                            <Eye size={18} className="text-[#78829D]" />
                                        </button>
                                    </td>
                                </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

}
