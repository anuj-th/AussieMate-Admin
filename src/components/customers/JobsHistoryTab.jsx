import { useState, useEffect, useMemo, useRef } from "react";
import { ChevronUp, ChevronDown, Eye, Upload } from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";
import PaginationRanges from "../common/PaginationRanges";
import tableSortIcon from "../../assets/icon/tableSort.svg";

const defaultJobHistory = [
  {
    id: 1,
    jobId: "AM10432",
    jobType: "Bond Cleaning",
    cleaner: {
      name: "Lori Mosciski",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    amount: 320,
    status: "Completed",
  },
  {
    id: 2,
    jobId: "AM10433",
    jobType: "Carpet Cleaning",
    cleaner: {
      name: "Randolph Hirthe",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    amount: 220,
    status: "Completed",
  },
  {
    id: 3,
    jobId: "AM10434",
    jobType: "NDIS Assistance",
    cleaner: {
      name: "Constance Harris",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    amount: 150,
    status: "Completed",
  },
  {
    id: 4,
    jobId: "AM10435",
    jobType: "Bond Cleaning",
    cleaner: {
      name: "Guy Brakus",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    amount: 320,
    status: "Cancelled",
  },
  {
    id: 5,
    jobId: "AM10436",
    jobType: "Carpet Cleaning",
    cleaner: {
      name: "Andre Abshire",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    amount: 220,
    status: "Completed",
  },
  {
    id: 6,
    jobId: "AM10437",
    jobType: "NDIS Assistance",
    cleaner: {
      name: "Andre Abshire",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    amount: 150,
    status: "Completed",
  },
];

export default function JobsHistoryTab({ customer }) {
  const [jobs, setJobs] = useState(customer?.jobHistory || defaultJobHistory);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const tableRef = useRef(null);

  const statusOptions = ["Completed", "Cancelled"];

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.jobType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.cleaner.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchQuery, statusFilter]);

  // Sort filtered jobs
  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (!sortColumn) return 0;

      let aValue = a[sortColumn];
      let bValue = b[sortColumn];

      if (sortColumn === "amount") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (sortColumn === "cleaner") {
        aValue = a.cleaner?.name || "";
        bValue = b.cleaner?.name || "";
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
    printWindow.document.write(`<html><head><title>Job History</title>${styles}</head><body>${tableHtml}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
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
      Completed: {
        bg: "bg-[#EAFFF1]",
        text: "text-[#17C653]",
        border: "border-[#17C65333]",
        dot: "bg-[#17C653]",
      },
      "In Progress": {
        bg: "bg-[#FFF8DD]",
        text: "text-[#F6B100]",
        border: "border-[#F6B10033]",
        dot: "bg-[#F6B100]",
      },
      Upcoming: {
        bg: "bg-[#EBF2FD]",
        text: "text-[#2563EB]",
        border: "border-[#2563EB33]",
        dot: "bg-[#2563EB]",
      },
      Cancelled: {
        bg: "bg-[#FEE2E2]",
        text: "text-[#EF4444]",
        border: "border-[#EF444433]",
        dot: "bg-[#EF4444]",
      },
    };

    const config = statusConfig[status] || statusConfig.Completed;

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.bg} ${config.text} border ${config.border}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full inline-block mr-1 ${config.dot}`} />
        {status}
      </span>
    );
  };

  useEffect(() => {
    const sourceJobs = customer?.jobHistory || defaultJobHistory;
    const normalized = sourceJobs.map((job) => ({
      ...job,
      jobType: job.jobType || job.service || "",
    }));
    setJobs(normalized);
    setSelectedRows([]);
    setSelectAll(false);
    setCurrentPage(1);
  }, [customer]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, itemsPerPage]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Filters Section */}
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 items-stretch lg:items-center justify-between">
          {/* Search */}
          <SearchInput
            placeholder="Search by Name, ABN, Email, Role"
            onChange={setSearchQuery}
            className="md:w-[300px]"
          />

          {/* Filters */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2 md:gap-3 items-stretch sm:items-center">
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

      {/* Table Section */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="w-full border-collapse min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <Checkbox
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div
                  className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                  onClick={() => handleSort("jobId")}
                >
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Job ID
                  </span>
                  <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                  {getSortIcon("jobId")}
                </div>
              </th>
              <th className="min-w-[200px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div
                  className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                  onClick={() => handleSort("jobType")}
                >
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Job Type
                  </span>
                  <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                  {getSortIcon("jobType")}
                </div>
              </th>
              <th className="min-w-[180px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <span className="font-medium text-gray-700 text-xs md:text-sm">
                  Cleaner
                </span>
              </th>
              <th className="min-w-[100px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div
                  className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Amount
                  </span>
                  <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                  {getSortIcon("amount")}
                </div>
              </th>
              <th className="min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <span className="font-medium text-gray-700 text-xs md:text-sm">
                  Status
                </span>
              </th>
              <th className="w-14 md:w-16 px-2 md:px-4 py-2 md:py-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedJobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                  <Checkbox
                    checked={selectedRows.includes(job.id)}
                    onChange={(e) => handleSelectRow(job.id, e.target.checked)}
                  />
                </td>
                <td className="min-w-[120px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                  <p className="text-sm font-medium text-primary">{job.jobId}</p>
                </td>
                <td className="min-w-[200px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                  <p className="text-sm text-primary">{job.jobType}</p>
                </td>
                <td className="min-w-[180px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                  <div className="flex items-center gap-2">
                    <img
                      src={job.cleaner.avatar}
                      alt={job.cleaner.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <p className="text-sm font-medium text-primary">
                      {job.cleaner.name}
                    </p>
                  </div>
                </td>
                <td className="min-w-[100px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                  <p className="text-sm font-medium text-primary">
                    AU${Number(job.amount).toLocaleString()}
                  </p>
                </td>
                <td className="min-w-[120px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                  {getStatusBadge(job.status)}
                </td>
                <td className="w-14 md:w-16 px-2 md:px-4 py-2 md:py-4 text-center">
                  <button
                    type="button"
                    className="p-2 inline-flex items-center justify-center cursor-pointer"
                    onClick={() => console.log("View job", job)}
                  >
                    <Eye size={18} className="text-[#78829D]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <PaginationRanges
        currentPage={currentPage}
        rowsPerPage={itemsPerPage}
        totalItems={filteredJobs.length}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}

