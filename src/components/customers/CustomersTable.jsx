import { useState, useEffect, useMemo } from "react";
import { ChevronUp, ChevronDown, Eye } from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";
import DatePicker from "../common/DatePicker";
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

const customerJobHistory = {
    1: defaultJobHistory,
    2: defaultJobHistory,
    3: defaultJobHistory,
    4: defaultJobHistory,
    5: defaultJobHistory,
    6: defaultJobHistory,
    7: defaultJobHistory,
    8: defaultJobHistory,
    9: defaultJobHistory,
    10: defaultJobHistory,
    11: defaultJobHistory,
    12: defaultJobHistory,
};

const defaultCustomers = [
    {
        id: 1,
        name: "Selina K",
        email: "selina.k@example.com",
        phone: "+61 768 675 0987",
        avatar: "https://i.pravatar.cc/150?img=1",
        jobsPosted: 12,
        spend: "3,240",
        joined: "2025-07-12",
        role: "Customer",
        status: "Active",
        location: "Sydney, NSW",
        badge: "Gold",
    },
    {
        id: 2,
        name: "George L",
        email: "george.l@example.com",
        phone: "+61 768 675 0988",
        avatar: "https://i.pravatar.cc/150?img=2",
        jobsPosted: 6,
        spend: "1,280",
        joined: "2025-08-02",
        role: "Customer",
        status: "Active",
        location: "Melbourne, VIC",
        badge: "Silver",
    },
    {
        id: 3,
        name: "Naomi P",
        email: "naomi.p@example.com",
        phone: "+61 768 675 0989",
        avatar: "https://i.pravatar.cc/150?img=3",
        jobsPosted: 16,
        spend: "4,560",
        joined: "2025-09-01",
        role: "Customer",
        status: "Active",
        location: "Brisbane, QLD",
        badge: "Gold",
    },
    {
        id: 4,
        name: "Guy Brakus",
        email: "guy.b@example.com",
        phone: "+61 768 675 0990",
        avatar: "https://i.pravatar.cc/150?img=4",
        jobsPosted: 45,
        spend: "12,400",
        joined: "2025-07-15",
        role: "Business",
        status: "Active",
        location: "Perth, WA",
        badge: "Platinum",
    },
    {
        id: 5,
        name: "Andre Abshire",
        email: "andre.a@example.com",
        phone: "+61 768 675 0991",
        avatar: "https://i.pravatar.cc/150?img=5",
        jobsPosted: 8,
        spend: "2,100",
        joined: "2025-08-10",
        role: "Customer",
        status: "Active",
        location: "Adelaide, SA",
        badge: "Silver",
    },
    {
        id: 6,
        name: "Laura Cruickshank III",
        email: "laura.c@example.com",
        phone: "+61 768 675 0992",
        avatar: "https://i.pravatar.cc/150?img=6",
        jobsPosted: 22,
        spend: "6,800",
        joined: "2025-08-20",
        role: "Customer",
        status: "Active",
        location: "Sydney, NSW",
        badge: "Gold",
    },
    {
        id: 7,
        name: "Arnold Koch",
        email: "arnold.k@example.com",
        phone: "+61 768 675 0993",
        avatar: "https://i.pravatar.cc/150?img=7",
        jobsPosted: 3,
        spend: "640",
        joined: "2025-09-05",
        role: "Customer",
        status: "Active",
        location: "Melbourne, VIC",
        badge: "Bronze",
    },
    {
        id: 8,
        name: "Mr. Gretchen Schumm",
        email: "gretchen.s@example.com",
        phone: "+61 768 675 0994",
        avatar: "https://i.pravatar.cc/150?img=8",
        jobsPosted: 18,
        spend: "5,200",
        joined: "2025-08-28",
        role: "Business",
        status: "Active",
        location: "Brisbane, QLD",
        badge: "Gold",
    },
    {
        id: 9,
        name: "Mindy Crona",
        email: "mindy.c@example.com",
        phone: "+61 768 675 0995",
        avatar: "https://i.pravatar.cc/150?img=9",
        jobsPosted: 10,
        spend: "3,100",
        joined: "2025-09-01",
        role: "Customer",
        status: "Active",
        location: "Sydney, NSW",
        badge: "Silver",
    },
    {
        id: 10,
        name: "Dr. Joshua Morar",
        email: "joshua.m@example.com",
        phone: "+61 768 675 0996",
        avatar: "https://i.pravatar.cc/150?img=10",
        jobsPosted: 30,
        spend: "9,600",
        joined: "2025-07-20",
        role: "Business",
        status: "Active",
        location: "Perth, WA",
        badge: "Platinum",
    },
    {
        id: 11,
        name: "Mindy Crona",
        email: "mindy.c2@example.com",
        phone: "+61 768 675 0997",
        avatar: "https://i.pravatar.cc/150?img=11",
        jobsPosted: 7,
        spend: "1,890",
        joined: "2025-08-15",
        role: "Customer",
        status: "Active",
        location: "Melbourne, VIC",
        badge: "Silver",
    },
    {
        id: 12,
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "+61 768 675 0998",
        avatar: "https://i.pravatar.cc/150?img=12",
        jobsPosted: 14,
        spend: "4,200",
        joined: "2025-08-25",
        role: "Customer",
        status: "Active",
        location: "Brisbane, QLD",
        badge: "Gold",
    },
];

export default function CustomersTable({ onViewCustomer }) {
    const [customers, setCustomers] = useState(defaultCustomers);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [locationFilter, setLocationFilter] = useState("");
    const [badgeFilter, setBadgeFilter] = useState("");
    const [dateJoined, setDateJoined] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const roleOptions = ["Customer", "Business"];
    const statusOptions = ["Active", "Inactive", "Suspended"];
    const locationOptions = ["Sydney, NSW", "Melbourne, VIC", "Brisbane, QLD", "Perth, WA", "Adelaide, SA"];
    const badgeOptions = ["Bronze", "Silver", "Gold", "Platinum"];

    // Filter customers based on search and filters
    const filteredCustomers = useMemo(() => {
        return customers.filter((customer) => {
            const matchesSearch =
                !searchQuery ||
                customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.phone.includes(searchQuery);
            const matchesRole = !roleFilter || customer.role === roleFilter;
            const matchesStatus = !statusFilter || customer.status === statusFilter;
            const matchesLocation = !locationFilter || customer.location === locationFilter;
            const matchesBadge = !badgeFilter || customer.badge === badgeFilter;
            const matchesDate = !dateJoined || customer.joined === dateJoined;

            return matchesSearch && matchesRole && matchesStatus && matchesLocation && matchesBadge && matchesDate;
        });
    }, [customers, searchQuery, roleFilter, statusFilter, locationFilter, badgeFilter, dateJoined]);

    // Sort filtered customers
    const sortedCustomers = useMemo(() => {
        return [...filteredCustomers].sort((a, b) => {
            if (!sortColumn) return 0;

            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            // Handle numeric sorting for jobsPosted and spend
            if (sortColumn === "jobsPosted") {
                aValue = Number(aValue);
                bValue = Number(bValue);
            } else if (sortColumn === "spend") {
                aValue = Number(aValue.replace(/,/g, ""));
                bValue = Number(bValue.replace(/,/g, ""));
            }

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredCustomers, sortColumn, sortDirection]);

    // Paginate sorted customers
    const paginatedCustomers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedCustomers.slice(startIndex, endIndex);
    }, [sortedCustomers, currentPage, itemsPerPage]);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            const pageIds = paginatedCustomers.map((customer) => customer.id);
            setSelectedRows([...new Set([...selectedRows, ...pageIds])]);
        } else {
            const pageIds = paginatedCustomers.map((customer) => customer.id);
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
    }, [searchQuery, roleFilter, statusFilter, locationFilter, badgeFilter, dateJoined, itemsPerPage]);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Filters Section */}
            <div className="p-3 md:p-4 border-b border-gray-200">
                <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-stretch xl:items-center justify-between">
                    {/* Search */}
                    <SearchInput
                        placeholder="Search by Name, ABN, Email, Role"
                        onChange={setSearchQuery}
                        className="w-full"
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

                        <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-32">
                            <CustomSelect
                                value={locationFilter}
                                onChange={setLocationFilter}
                                placeholder="Location"
                                options={locationOptions}
                                className="w-full"
                            />
                        </div>

                        <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-32">
                            <CustomSelect
                                value={badgeFilter}
                                onChange={setBadgeFilter}
                                placeholder="Badge"
                                options={badgeOptions}
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
                                <div
                                    className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                    onClick={() => handleSort("name")}
                                >
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">
                                        Customer
                                    </span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                    {getSortIcon("name")}
                                </div>
                            </th>
                            <th className="min-w-[140px] md:min-w-[160px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div
                                    className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                    onClick={() => handleSort("phone")}
                                >
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Phone Number</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                    {getSortIcon("phone")}
                                </div>
                            </th>
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div
                                    className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                    onClick={() => handleSort("jobsPosted")}
                                >
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Jobs Posted</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                    {getSortIcon("jobsPosted")}
                                </div>
                            </th>
                            <th className="min-w-[120px] md:min-w-[140px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div
                                    className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                    onClick={() => handleSort("spend")}
                                >
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Spend</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                    {getSortIcon("spend")}
                                </div>
                            </th>
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div
                                    className="flex items-center gap-1.5 md:gap-2 cursor-pointer"
                                    onClick={() => handleSort("joined")}
                                >
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Joined</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                    {getSortIcon("joined")}
                                </div>
                            </th>
                            <th className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-3 text-center">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedCustomers.map((customer) => (
                            <tr
                                key={customer.id}
                                className="border-b border-gray-200"
                            >
                                <td className="w-12 md:w-16 px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                    <Checkbox
                                        checked={selectedRows.includes(customer.id)}
                                        onChange={(e) =>
                                            handleSelectRow(customer.id, e.target.checked)
                                        }
                                    />
                                </td>
                                <td className="min-w-[200px] md:min-w-[250px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <img
                                            src={customer.avatar}
                                            alt={customer.name}
                                            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-primary truncate">
                                                {customer.name}
                                            </p>
                                            <p className="text-sm text-primary-light truncate">
                                                {customer.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="min-w-[140px] md:min-w-[160px] px-2 md:px-4 py-2 md:py-4 text-gray-700 border-r border-gray-200 text-xs md:text-sm">
                                    {customer.phone}
                                </td>
                                <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-sm font-medium text-primary border-r border-gray-200">
                                    {customer.jobsPosted}
                                </td>
                                <td className="min-w-[120px] md:min-w-[140px] px-2 md:px-4 py-2 md:py-4 text-sm font-medium text-primary border-r border-gray-200">
                                    AU${customer.spend}
                                </td>
                                <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-sm font-medium text-primary border-r border-gray-200">
                                    {customer.joined}
                                </td>
                                <td className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-4 text-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const history =
                                                customerJobHistory[customer.id] || defaultJobHistory;
                                            onViewCustomer &&
                                                onViewCustomer({
                                                    ...customer,
                                                    jobHistory: history.map((job) => ({ ...job })),
                                                });
                                        }}
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
                totalItems={filteredCustomers.length}
                onPageChange={setCurrentPage}
                onRowsPerPageChange={setItemsPerPage}
            />
        </div>
    );
}

