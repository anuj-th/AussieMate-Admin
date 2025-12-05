import { useState, useEffect, useMemo } from "react";
import { Eye, Star, User2 } from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";
import DatePicker from "../common/DatePicker";
import PaginationRanges from "../common/PaginationRanges";
import tableSortIcon from "../../assets/icon/tableSort.svg";
import silverTierIcon from "../../assets/icon/silver.svg";
import goldTierIcon from "../../assets/icon/gold.svg";
import bronzeTierIcon from "../../assets/icon/bronze.svg";

const defaultCleaners = [
    {
        id: 1,
        name: "Lori Mosciski",
        role: "Professional Cleaner",
        avatar: "https://i.pravatar.cc/150?img=1",
        badge: "Silver",
        jobs: 128,
        rating: 4.2,
        earnings: 12420,
        status: "Active",
        joined: "2025-07-12",
    },
    {
        id: 2,
        name: "Randolph Hirthe",
        role: "Student Cleaner",
        avatar: "https://i.pravatar.cc/150?img=2",
        badge: "Gold",
        jobs: 14,
        rating: 4.6,
        earnings: 920,
        status: "Active",
        joined: "2025-08-02",
    },
    {
        id: 3,
        name: "Constance Harris",
        role: "Support Service Provider",
        avatar: "https://i.pravatar.cc/150?img=3",
        badge: "Bronze",
        jobs: 412,
        rating: 4.8,
        earnings: 38240,
        status: "Active",
        joined: "2025-09-01",
    },
    {
        id: 4,
        name: "Guy Brakus",
        role: "Pet Sitter",
        avatar: "https://i.pravatar.cc/150?img=4",
        badge: "Gold",
        jobs: 23,
        rating: 4.1,
        earnings: 12420,
        status: "Pending Docs",
        joined: "2025-09-01",
    },
    {
        id: 5,
        name: "Andre Abshire",
        role: "Professional Cleaner",
        avatar: "https://i.pravatar.cc/150?img=5",
        badge: "Silver",
        jobs: 53,
        rating: 4.4,
        earnings: 920,
        status: "Pending Docs",
        joined: "2025-07-12",
    },
    {
        id: 6,
        name: "Laura Cruickshank III",
        role: "Handyman",
        avatar: "https://i.pravatar.cc/150?img=6",
        badge: "Silver",
        jobs: 23,
        rating: 4.2,
        earnings: 38240,
        status: "Pending Docs",
        joined: "2025-07-12",
    },
    {
        id: 7,
        name: "Arnold Koch",
        role: "Housekeeper",
        avatar: "https://i.pravatar.cc/150?img=7",
        badge: "Silver",
        jobs: 53,
        rating: 4.4,
        earnings: 12420,
        status: "Pending Docs",
        joined: "2025-07-12",
    },
    {
        id: 8,
        name: "Mr. Gretchen Schumm",
        role: "Pet Sitter",
        avatar: "https://i.pravatar.cc/150?img=8",
        badge: "Gold",
        jobs: 32,
        rating: 4.3,
        earnings: 920,
        status: "Active",
        joined: "2025-07-12",
    },
    {
        id: 9,
        name: "Mindy Crona",
        role: "Support Service Provider",
        avatar: "https://i.pravatar.cc/150?img=9",
        badge: "Gold",
        jobs: 43,
        rating: 4.4,
        earnings: 38240,
        status: "Pending Docs",
        joined: "2025-07-12",
    },
    {
        id: 10,
        name: "Dr. Joshua Morar",
        role: "Student Cleaner",
        avatar: "https://i.pravatar.cc/150?img=10",
        badge: "Silver",
        jobs: 23,
        rating: 4.3,
        earnings: 12420,
        status: "Pending Docs",
        joined: "2025-07-12",
    },
];

export default function CleanersTable({ onViewCleaner }) {
    const [cleaners, setCleaners] = useState(defaultCleaners);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [badgeFilter, setBadgeFilter] = useState("");
    const [dateJoined, setDateJoined] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const roleOptions = [
        "Professional Cleaner",
        "Student Cleaner",
        "Support Service Provider",
        "Pet Sitter",
        "Handyman",
        "Housekeeper",
    ];

    const statusOptions = ["Active", "Pending Docs"];
    const badgeOptions = ["Silver", "Gold", "Bronze"];

    // Filter cleaners based on search and filters
    const filteredCleaners = useMemo(() => {
        return cleaners.filter((cleaner) => {
            const matchesSearch = !searchQuery || 
                cleaner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cleaner.role.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesRole = !roleFilter || cleaner.role === roleFilter;
            const matchesStatus = !statusFilter || cleaner.status === statusFilter;
            const matchesBadge = !badgeFilter || cleaner.badge === badgeFilter;
            const matchesDate = !dateJoined || cleaner.joined === dateJoined;
            
            return matchesSearch && matchesRole && matchesStatus && matchesBadge && matchesDate;
        });
    }, [cleaners, searchQuery, roleFilter, statusFilter, badgeFilter, dateJoined]);

    // Paginate filtered cleaners
    const paginatedCleaners = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredCleaners.slice(startIndex, endIndex);
    }, [filteredCleaners, currentPage, itemsPerPage]);

    const handleSelectAll = (checked) => {
        setSelectAll(checked);
        if (checked) {
            const pageIds = paginatedCleaners.map((cleaner) => cleaner.id);
            setSelectedRows([...new Set([...selectedRows, ...pageIds])]);
        } else {
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

    const getBadgeIcon = (badge) => {
        switch (badge?.toLowerCase()) {
            case "gold":
                return goldTierIcon;
            case "bronze":
                return bronzeTierIcon;
            default:
                return silverTierIcon;
        }
    };

    // Styles for tier pill to match the provided design
    const getBadgeStyles = (badge) => {
        switch (badge?.toLowerCase()) {
            case "gold":
                // Gold: subtle orange border + warm gradient background
                return {
                    container:
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FEC54A] bg-gradient-to-r from-[#FFFFFF] to-[#FFDBAE]",
                    text: "text-[#B45309] text-xs md:text-sm font-medium",
                };
            case "bronze":
                // Bronze: similar structure with bronze tones
                return {
                    container:
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#F4B08A] bg-gradient-to-r from-[#FFFFFF] to-[#FFE0C2]",
                    text: "text-[#92400E] text-xs md:text-sm font-medium",
                };
            default:
                // Silver: light grey border (0.6px) and soft silver gradient
                return {
                    container:
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border-[0.6px] border-[#E9E9E9] bg-gradient-to-r from-[#FFFFFF] to-[#E9E9E9]",
                    text: "text-primary text-xs md:text-sm font-medium",
                };
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return {
                    dot: "bg-[#17C653]",
                    text: "text-[#17C653]",
                    bg: "bg-[#EAFFF1]",
                    border: "border-[#17C65333]",
                };
            case "Pending Docs":
                return {
                    dot: "bg-[#F6B100]",
                    text: "text-[#F6B100]",
                    bg: "bg-[#FFF8DD]",
                    border: "border-[#F6B10033]",
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

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, roleFilter, statusFilter, badgeFilter, dateJoined, itemsPerPage]);

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            {/* Filters Section */}
            <div className="p-3 md:p-4 border-b border-gray-200">
                <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-stretch xl:items-center justify-between">
                    {/* Search */}
                    <SearchInput
                        placeholder="Search by Name, ABN, Email, Role"
                        onChange={setSearchQuery}
                        className="md:w-[300px]"
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
                <table className="w-full border-collapse min-w-[1000px]">
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
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Badge</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[80px] md:min-w-[100px] px-2 md:px-4 font-medium py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Jobs</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[80px] md:min-w-[100px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Rating</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Earnings</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Status</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <span className="font-medium text-gray-700 text-xs md:text-sm">Joined</span>
                                    <img src={tableSortIcon} alt="sort" className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                                </div>
                            </th>
                            <th className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-3 text-center">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedCleaners.map((cleaner) => {
                            const statusColors = getStatusColor(cleaner.status);
                            return (
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
                                            {cleaner.avatar ? (
                                                <img
                                                    src={cleaner.avatar}
                                                    alt={cleaner.name}
                                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                    <User2 size={16} className="text-gray-400" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="font-medium text-primary text-xs md:text-sm truncate">
                                                    {cleaner.name}
                                                </p>
                                                <p className="text-[12px] md:text-sm text-primary-light truncate">{cleaner.role}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="min-w-[130px] md:min-w-[150px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        {(() => {
                                            const badgeStyles = getBadgeStyles(cleaner.badge);
                                            return (
                                                <div className={badgeStyles.container}>
                                                    <img
                                                        src={getBadgeIcon(cleaner.badge)}
                                                        alt={`${cleaner.badge} Tier`}
                                                        className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0"
                                                    />
                                                    <span className={badgeStyles.text}>
                                                        {cleaner.badge} Tier
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </td>
                                    <td className="min-w-[80px] md:min-w-[100px] px-2 md:px-4 py-2 md:py-4 text-primary border-r border-gray-200 text-xs md:text-sm">
                                        {cleaner.jobs}
                                    </td>
                                    <td className="min-w-[80px] md:min-w-[100px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <div
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFF4E0]"
                                            style={{ border: "0.6px solid #FFEDBA" }}
                                        >
                                            <Star size={14} className="text-[#FFB020] fill-[#FFB020]" />
                                            <span className="text-xs md:text-sm text-primary font-medium">
                                                {cleaner.rating}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                                        AU${cleaner.earnings.toLocaleString()}
                                    </td>
                                    <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusColors.bg} ${statusColors.border} ${statusColors.text} text-xs md:text-sm font-medium`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
                                            {cleaner.status}
                                        </span>
                                    </td>
                                    <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                                        {cleaner.joined}
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
                            );
                        })}
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

