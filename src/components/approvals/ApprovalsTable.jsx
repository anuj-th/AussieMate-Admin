import { useState, useEffect, useMemo } from "react";
import { ChevronUp, ChevronDown, Eye } from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";
import DatePicker from "../common/DatePicker";
import PaginationRanges from "../common/PaginationRanges";
import tableSortIcon from "../../assets/icon/tableSort.svg";

const defaultCleaners = [
    {
        id: 1,
        name: "Lori Mosciski",
        role: "Professional Cleaner",
        avatar: "https://i.pravatar.cc/150?img=1",
        radius: "0-20 km",
        joined: "12-07-2025",
        status: "Pending",
    },
    {
        id: 2,
        name: "Randolph Hirthe",
        role: "Student Cleaner",
        avatar: "https://i.pravatar.cc/150?img=2",
        radius: "0-10 km",
        joined: "13-07-2025",
        status: "Verified",
    },
    {
        id: 3,
        name: "Constance Harris",
        role: "Support Service Provider",
        avatar: "https://i.pravatar.cc/150?img=3",
        radius: "0-30 km",
        joined: "14-07-2025",
        status: "Pending",
    },
    {
        id: 4,
        name: "Guy Brakus",
        role: "Pet Sitter",
        avatar: "https://i.pravatar.cc/150?img=4",
        radius: "0-20 km",
        joined: "17-07-2025",
        status: "Verified",
    },
    {
        id: 5,
        name: "Andre Abshire",
        role: "Professional Cleaner",
        avatar: "https://i.pravatar.cc/150?img=5",
        radius: "0-10 km",
        joined: "18-07-2025",
        status: "Pending",
    },
    {
        id: 6,
        name: "Laura Cruickshank III",
        role: "Handyman",
        avatar: "https://i.pravatar.cc/150?img=6",
        radius: "0-30 km",
        joined: "20-07-2025",
        status: "Verified",
    },
    {
        id: 7,
        name: "Arnold Koch",
        role: "Housekeeper",
        avatar: "https://i.pravatar.cc/150?img=7",
        radius: "0-20 km",
        joined: "27-07-2025",
        status: "Pending",
    },
    {
        id: 8,
        name: "Mr. Gretchen Schumm",
        role: "Pet Sitter",
        avatar: "https://i.pravatar.cc/150?img=8",
        radius: "0-10 km",
        joined: "28-07-2025",
        status: "Verified",
    },
    {
        id: 9,
        name: "Mindy Crona",
        role: "Support Service Provider",
        avatar: "https://i.pravatar.cc/150?img=9",
        radius: "0-30 km",
        joined: "30-07-2025",
        status: "Pending",
    },
    {
        id: 10,
        name: "Dr. Joshua Morar",
        role: "Student Cleaner",
        avatar: "https://i.pravatar.cc/150?img=10",
        radius: "0-20 km",
        joined: "01-08-2025",
        status: "Verified",
    },
    {
        id: 11,
        name: "Dr. Joshua Morar",
        role: "Student Cleaner",
        avatar: "https://i.pravatar.cc/150?img=10",
        radius: "0-20 km",
        joined: "01-08-2025",
        status: "Verified",
    },
    {
        id: 12,
        name: "Dr. Joshua Morar",
        role: "Student Cleaner",
        avatar: "https://i.pravatar.cc/150?img=10",
        radius: "0-20 km",
        joined: "01-08-2025",
        status: "Verified",
    },
    {
        id: 13,
        name: "Dr. Joshua Morar",
        role: "Student Cleaner",
        avatar: "https://i.pravatar.cc/150?img=10",
        radius: "0-20 km",
        joined: "01-08-2025",
        status: "Verified",
    },
];

export default function ApprovalsTable({ onViewCleaner }) {
    const [cleaners, setCleaners] = useState(defaultCleaners);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateJoined, setDateJoined] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const roleOptions = [
        "Professional Cleaner",
        "Student Cleaner",
        "Support Service Provider",
        "Pet Sitter",
        "Handyman",
        "Housekeeper",
    ];

    // Status filter options (for dropdown)
    // Note: current data only uses "Pending" and "Verified".
    // "Approved", "Rejected", and "Expired" are included for future use.
    const statusOptions = ["Pending", "Approved", "Rejected", "Expired", "Verified"];

    // Filter cleaners based on search and filters
    const filteredCleaners = useMemo(() => {
        return cleaners.filter((cleaner) => {
            const matchesSearch = !searchQuery ||
                cleaner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cleaner.role.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = !roleFilter || cleaner.role === roleFilter;
            const matchesStatus = !statusFilter || cleaner.status === statusFilter;
            const matchesDate = !dateJoined || cleaner.joined === dateJoined;

            return matchesSearch && matchesRole && matchesStatus && matchesDate;
        });
    }, [cleaners, searchQuery, roleFilter, statusFilter, dateJoined]);

    // Sort filtered cleaners
    const sortedCleaners = useMemo(() => {
        return [...filteredCleaners].sort((a, b) => {
            if (!sortColumn) return 0;

            const aValue = a[sortColumn];
            const bValue = b[sortColumn];

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredCleaners, sortColumn, sortDirection]);

    // Paginate sorted cleaners
    const paginatedCleaners = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedCleaners.slice(startIndex, endIndex);
    }, [sortedCleaners, currentPage, itemsPerPage]);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            // Select all items on current page
            const pageIds = paginatedCleaners.map((cleaner) => cleaner.id);
            setSelectedRows([...new Set([...selectedRows, ...pageIds])]);
        } else {
            // Deselect all items on current page
            const pageIds = paginatedCleaners.map((cleaner) => cleaner.id);
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


    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter, statusFilter, dateJoined, itemsPerPage]);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Filters Section */}
            <div className="p-3 md:p-4 border-b border-gray-200">
                {/* Stack on mobile & tablet, side‑by‑side only on very large screens */}
                <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-stretch xl:items-center justify-between">
                    {/* Search */}

                    <SearchInput
                        placeholder="ABN / Name / Email"
                        onChange={setSearchQuery}
                        className="w-full md:w-[200px]"
                    />


                    {/* Filters */}
                    <div className="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-row xl:flex-nowrap gap-2 md:gap-3">

                        <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-32">
                            <CustomSelect
                                value={roleFilter}
                                onChange={setRoleFilter}
                                placeholder="Role"
                                options={roleOptions}
                                className="w-full"
                            />
                        </div>

                        <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-32">
                            <CustomSelect
                                value={statusFilter}
                                onChange={setStatusFilter}
                                placeholder="Status"
                                options={statusOptions}
                                className="w-full"
                            />
                        </div>

                        <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-40">
                            <DatePicker
                                label="Date Joined"
                                value={dateJoined}
                                onChange={setDateJoined}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[800px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <Checkbox
                                    checked={selectAll}
                                    onChange={(e) => handleSelectAll(e.target.checked)}
                                />
                            </th>
                            <th className="min-w-[200px] md:min-w-[250px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">
                                        Cleaner Name & Role
                                    </span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Radius</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Joined</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[130px] md:min-w-[150px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">
                                        Approval Status
                                    </span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-3 text-center">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedCleaners.map((cleaner) => (
                            <tr
                                key={cleaner.id}
                                className="border-b border-gray-200"
                            >
                                <td className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                    <Checkbox
                                        checked={selectedRows.includes(cleaner.id)}
                                        onChange={(e) =>
                                            handleSelectRow(cleaner.id, e.target.checked)
                                        }
                                    />
                                </td>
                                <td className="min-w-[200px] md:min-w-[250px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <img
                                            src={cleaner.avatar}
                                            alt={cleaner.name}
                                            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-900 text-xs md:text-sm truncate">
                                                {cleaner.name}
                                            </p>
                                            <p className="text-[10px] md:text-xs text-gray-500 truncate">{cleaner.role}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-gray-700 border-r border-gray-200 text-xs md:text-sm">
                                    {cleaner.radius}
                                </td>
                                <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-gray-700 border-r border-gray-200 text-xs md:text-sm">
                                    {cleaner.joined}
                                </td>
                                <td className="min-w-[130px] md:min-w-[150px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                    <span
                                        className={`inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium border ${cleaner.status === "Verified"
                                            ? "bg-[#EAFFF1] border-[#17C65333] text-[#17C653]"
                                            : "bg-[#FFF8DD] border-[#F6B10033] text-[#F6B100]"
                                            }`}
                                    >
                                        <span
                                            className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${cleaner.status === "Verified"
                                                ? "bg-[#17C653]"
                                                : "bg-[#F6B100]"
                                                }`}
                                        />                                      {cleaner.status}
                                    </span>
                                </td>
                                <td className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-4 text-center">
                                    <button
                                        type="button"
                                        onClick={() => onViewCleaner && onViewCleaner(cleaner)}
                                        className="rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors mx-auto"
                                    >
                                        <Eye size={20} className="text-[#78829D] cursor-pointer" />
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
                totalItems={filteredCleaners.length}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={setItemsPerPage}
            />

        </div>
    );
}

