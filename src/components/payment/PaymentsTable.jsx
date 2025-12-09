import { useState, useEffect, useMemo } from "react";
import { Eye, User2 } from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";
import DatePicker from "../common/DatePicker";
import PaginationRanges from "../common/PaginationRanges";
import tableSortIcon from "../../assets/icon/tableSort.svg";

const defaultTransactions = [
  {
    id: 1,
    jobId: "AM10432",
    transactionId: "TXN-20250919-001",
    customer: {
      name: "Selina K",
      email: "selina.k@example.com",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    cleaner: {
      name: "Lori Mosciski",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    totalAmount: 320,
    payableAmount: 256,
    status: "Released",
    date: "2025-09-20",
    service: "Cleaning",
  },
  {
    id: 2,
    jobId: "AM10433",
    transactionId: "TXN-20250810-014",
    customer: {
      name: "George L",
      email: "george.l@example.com",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    cleaner: {
      name: "Randolph Hirthe",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    totalAmount: 220,
    payableAmount: 176,
    status: "Released",
    date: "2025-08-12",
    service: "Housekeeping",
  },
  {
    id: 3,
    jobId: "AM10434",
    transactionId: "TXN-20250805-008",
    customer: {
      name: "Naomi P",
      email: "naomi.p@example.com",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    cleaner: {
      name: "Constance Harris",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    totalAmount: 150,
    payableAmount: 120,
    status: "Released",
    date: "2025-08-05",
    service: "Commercial Cleaning",
  },
  {
    id: 4,
    jobId: "AM10435",
    transactionId: "TXN-20250725-022",
    customer: {
      name: "Guy Brakus",
      email: "guy.brakus@example.com",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    cleaner: {
      name: "Guy Brakus",
      avatar: "https://i.pravatar.cc/150?img=14",
    },
    totalAmount: 400,
    payableAmount: 320,
    status: "Held",
    date: "2025-07-25",
    service: "Handyman",
  },
  {
    id: 5,
    jobId: "AM10436",
    transactionId: "TXN-20250720-015",
    customer: {
      name: "Andre Abshire",
      email: "andre.abshire@example.com",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    cleaner: {
      name: "Andre Abshire",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    totalAmount: 280,
    payableAmount: 224,
    status: "Released",
    date: "2025-07-20",
    service: "Pet Sitter",
  },
  {
    id: 6,
    jobId: "AM10437",
    transactionId: "TXN-20250715-009",
    customer: {
      name: "Laura Cruickshank III",
      email: "laura.cruickshank@example.com",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    cleaner: {
      name: "Laura Cruickshank",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
    totalAmount: 350,
    payableAmount: 280,
    status: "Held",
    date: "2025-07-15",
    service: "Support Service Provider",
  },
  {
    id: 7,
    jobId: "AM10438",
    transactionId: "TXN-20250710-003",
    customer: {
      name: "Arnold Koch",
      email: "arnold.koch@example.com",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    cleaner: {
      name: "Arnold Koch",
      avatar: "https://i.pravatar.cc/150?img=17",
    },
    totalAmount: 150,
    payableAmount: 120,
    status: "Held",
    date: "2025-07-30",
    service: "Cleaning",
  },
  {
    id: 8,
    jobId: "AM10439",
    transactionId: "TXN-20250705-001",
    customer: {
      name: "Mr. Gretchen Schumm",
      email: "gretchen.schumm@example.com",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    cleaner: {
      name: "Gretchen Schumm",
      avatar: "https://i.pravatar.cc/150?img=18",
    },
    totalAmount: 200,
    payableAmount: 160,
    status: "Released",
    date: "2025-07-05",
    service: "Housekeeping",
  },
  // Add more transactions to reach 52 total
  ...Array.from({ length: 44 }, (_, i) => ({
    id: 9 + i,
    jobId: `AM${10440 + i}`,
    transactionId: `TXN-2025${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}-${String(i + 1).padStart(3, "0")}`,
    customer: {
      name: `Customer ${i + 1}`,
      email: `customer${i + 1}@example.com`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 20) + 1}`,
    },
    cleaner: {
      name: `Cleaner ${i + 1}`,
      avatar: `https://i.pravatar.cc/150?img=${(i % 20) + 21}`,
    },
    totalAmount: Math.floor(Math.random() * 500) + 100,
    payableAmount: Math.floor(Math.random() * 400) + 80,
    status: Math.random() > 0.5 ? "Released" : "Held",
    date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    service: ["Cleaning", "Housekeeping", "Support Service Provider", "Handyman", "Pet Sitter", "Commercial Cleaning"][Math.floor(Math.random() * 6)],
  })),
];

export default function PaymentsTable({ onViewTransaction }) {
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [dateRange, setDateRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paymentStatusOptions = ["Released", "Held", "Failed"];
  const serviceOptions = [
    "Cleaning",
    "Housekeeping",
    "Support Service Provider",
    "Handyman",
    "Pet Sitter",
    "Commercial Cleaning",
  ];
  const stateOptions = ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"];

  // Filter transactions based on search and filters
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        !searchQuery ||
        transaction.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.cleaner.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPaymentStatus =
        !paymentStatusFilter || transaction.status === paymentStatusFilter;
      const matchesService =
        !serviceFilter || transaction.service === serviceFilter;
      const matchesDate =
        !dateRange ||
        (dateRange.start &&
          dateRange.end &&
          transaction.date >=
            new Date(dateRange.start).toISOString().split("T")[0] &&
          transaction.date <=
            new Date(dateRange.end).toISOString().split("T")[0]);

      return (
        matchesSearch && matchesPaymentStatus && matchesService && matchesDate
      );
    });
  }, [
    transactions,
    searchQuery,
    paymentStatusFilter,
    serviceFilter,
    dateRange,
  ]);

  // Paginate filtered transactions
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTransactions.slice(startIndex, endIndex);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      const pageIds = paginatedTransactions.map((transaction) => transaction.id);
      setSelectedRows([...new Set([...selectedRows, ...pageIds])]);
    } else {
      const pageIds = paginatedTransactions.map((transaction) => transaction.id);
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Released":
        return {
          dot: "bg-[#17C653]",
          text: "text-[#17C653]",
        };
      case "Held":
        return {
          dot: "bg-[#F6B100]",
          text: "text-[#F6B100]",
        };
      case "Failed":
        return {
          dot: "bg-[#EF4444]",
          text: "text-[#EF4444]",
        };
      default:
        return {
          dot: "bg-gray-400",
          text: "text-gray-400",
        };
    }
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    paymentStatusFilter,
    serviceFilter,
    stateFilter,
    dateRange,
    itemsPerPage,
  ]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Filters Section */}
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-stretch xl:items-center justify-between">
          {/* Search */}
          <SearchInput
            placeholder="Search by Job ID, Customer Name, Cleaner Name"
            onChange={setSearchQuery}
            className="md:w-[350px]"
          />

          {/* Filters */}
          <div className="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-row xl:flex-nowrap gap-2 md:gap-3">
            <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-40">
              <CustomSelect
                value={paymentStatusFilter}
                onChange={setPaymentStatusFilter}
                placeholder="Payment Status"
                options={paymentStatusOptions}
                className="w-full"
                showSelectedHeader
              />
            </div>

            <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-40">
              <CustomSelect
                value={serviceFilter}
                onChange={setServiceFilter}
                placeholder="Service"
                options={serviceOptions}
                className="w-full"
                showSelectedHeader
              />
            </div>


            <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-40">
              <DatePicker
                label="Date Range"
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[1200px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <Checkbox
                  checked={selectAll}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Job ID
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="min-w-[150px] md:min-w-[180px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Transaction ID
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="min-w-[180px] md:min-w-[220px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Customer
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="min-w-[150px] md:min-w-[180px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Cleaner
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Total Amount
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Payable Amount
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Status
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <span className="font-medium text-gray-700 text-xs md:text-sm">
                    Date
                  </span>
                  <img
                    src={tableSortIcon}
                    alt="sort"
                    className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                  />
                </div>
              </th>
              <th className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction) => {
              const statusColors = getStatusColor(transaction.status);
              return (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                    <Checkbox
                      checked={selectedRows.includes(transaction.id)}
                      onChange={(e) =>
                        handleSelectRow(transaction.id, e.target.checked)
                      }
                    />
                  </td>
                  <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                    {transaction.jobId}
                  </td>
                  <td className="min-w-[150px] md:min-w-[180px] px-2 md:px-4 py-2 md:py-4 text-primary border-r border-gray-200 text-xs md:text-sm">
                    {transaction.transactionId}
                  </td>
                  <td className="min-w-[180px] md:min-w-[220px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                    <div className="flex items-center gap-2 md:gap-3">
                      {transaction.customer.avatar ? (
                        <img
                          src={transaction.customer.avatar}
                          alt={transaction.customer.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User2 size={16} className="text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-primary text-xs md:text-sm truncate">
                          {transaction.customer.name}
                        </p>
                        <p className="text-[12px] md:text-sm text-primary-light truncate">
                          {transaction.customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="min-w-[150px] md:min-w-[180px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                    <div className="flex items-center gap-2 md:gap-3">
                      {transaction.cleaner.avatar ? (
                        <img
                          src={transaction.cleaner.avatar}
                          alt={transaction.cleaner.name}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <User2 size={16} className="text-gray-400" />
                        </div>
                      )}
                      <p className="font-medium text-primary text-xs md:text-sm truncate">
                        {transaction.cleaner.name}
                      </p>
                    </div>
                  </td>
                  <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                    AU${transaction.totalAmount.toLocaleString()}
                  </td>
                  <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                    AU${transaction.payableAmount.toLocaleString()}
                  </td>
                  <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusColors.text} text-xs md:text-sm font-medium`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`}
                      />
                      {transaction.status}
                    </span>
                  </td>
                  <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                    {transaction.date}
                  </td>
                  <td className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-4 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        onViewTransaction && onViewTransaction(transaction)
                      }
                      className="rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors mx-auto"
                    >
                      <Eye
                        size={20}
                        className="text-[#78829D] cursor-pointer"
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <PaginationRanges
        currentPage={currentPage}
        rowsPerPage={itemsPerPage}
        totalItems={filteredTransactions.length}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}

