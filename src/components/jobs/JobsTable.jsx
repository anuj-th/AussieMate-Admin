import { useState, useEffect, useMemo } from "react";
import { Eye, User2 } from "lucide-react";
import Checkbox from "../common/Checkbox";
import SearchInput from "../common/SearchInput";
import CustomSelect from "../common/CustomSelect";
import DatePicker from "../common/DatePicker";
import PaginationRanges from "../common/PaginationRanges";
import tableSortIcon from "../../assets/icon/tableSort.svg";
import PageHeader from "../../layout/PageHeader";

const defaultJobs = [
    {
        id: 1,
        jobId: "AM10432",
        jobType: "Cleaning",
        customer: {
            name: "Selina K",
            email: "selina.k@example.com",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
        cleaner: {
            name: "Lori Mosciski",
            avatar: "https://i.pravatar.cc/150?img=11",
        },
        jobStatus: "Completed",
        paymentStatus: "Released",
        date: "20-09-2025",
        amountPaid: 320,
    },
    {
        id: 2,
        jobId: "AM10433",
        jobType: "Handyman",
        customer: {
            name: "George L",
            email: "george.l@example.com",
            avatar: "https://i.pravatar.cc/150?img=2",
        },
        cleaner: {
            name: "Randolph Hirthe",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        jobStatus: "Ongoing",
        paymentStatus: "Held",
        date: "20-09-2025",
        amountPaid: 220,
    },
    {
        id: 3,
        jobId: "AM10434",
        jobType: "Support Service Provider",
        customer: {
            name: "Naomi P",
            email: "naomi.p@example.com",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
        cleaner: {
            name: "Constance Harris",
            avatar: "https://i.pravatar.cc/150?img=13",
        },
        jobStatus: "Ongoing",
        paymentStatus: "Held",
        date: "20-09-2025",
        amountPaid: 150,
    },
    {
        id: 4,
        jobId: "AM10435",
        jobType: "Housekeeping",
        customer: {
            name: "Guy Brakus",
            email: "guy.b@example.com",
            avatar: "https://i.pravatar.cc/150?img=4",
        },
        cleaner: {
            name: "Guy Brakus",
            avatar: "https://i.pravatar.cc/150?img=14",
        },
        jobStatus: "Upcoming",
        paymentStatus: "Held",
        date: "20-09-2025",
        amountPaid: 280,
    },
    {
        id: 5,
        jobId: "AM10432",
        jobType: "Pet Sitter",
        customer: {
            name: "Andre Abshire",
            email: "andre.a@example.com",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
        cleaner: {
            name: "Andre Abshire",
            avatar: "https://i.pravatar.cc/150?img=15",
        },
        jobStatus: "Completed",
        paymentStatus: "Held",
        date: "20-09-2025",
        amountPaid: 180,
    },
    {
        id: 6,
        jobId: "AM10433",
        jobType: "Pet Sitter",
        customer: {
            name: "Laura Cruickshank III",
            email: "laura.c@example.com",
            avatar: "https://i.pravatar.cc/150?img=6",
        },
        cleaner: {
            name: "Laura Cruickshank III",
            avatar: "https://i.pravatar.cc/150?img=16",
        },
        jobStatus: "Completed",
        paymentStatus: "Released",
        date: "20-09-2025",
        amountPaid: 200,
    },
    {
        id: 7,
        jobId: "AM10434",
        jobType: "Handyman",
        customer: {
            name: "Arnold Koch",
            email: "arnold.k@example.com",
            avatar: "https://i.pravatar.cc/150?img=7",
        },
        cleaner: {
            name: "Arnold Koch",
            avatar: "https://i.pravatar.cc/150?img=17",
        },
        jobStatus: "Completed",
        paymentStatus: "Released",
        date: "20-09-2025",
        amountPaid: 250,
    },
    {
        id: 8,
        jobId: "AM10435",
        jobType: "Handyman",
        customer: {
            name: "Mr. Gretchen Schumm",
            email: "gretchen.s@example.com",
            avatar: "https://i.pravatar.cc/150?img=8",
        },
        cleaner: {
            name: "Mr. Gretchen Schumm",
            avatar: "https://i.pravatar.cc/150?img=18",
        },
        jobStatus: "Cancelled",
        paymentStatus: "Cancelled",
        date: "20-09-2025",
        amountPaid: null,
    },
    {
        id: 9,
        jobId: "AM10435",
        jobType: "Support Service Provider",
        customer: {
            name: "Mindy Crona",
            email: "mindy.c@example.com",
            avatar: "https://i.pravatar.cc/150?img=9",
        },
        cleaner: {
            name: "Mindy Crona",
            avatar: "https://i.pravatar.cc/150?img=19",
        },
        jobStatus: "Upcoming",
        paymentStatus: "Held",
        date: "20-09-2025",
        amountPaid: 320,
    },
    {
        id: 10,
        jobId: "AM10435",
        jobType: "Housekeeping",
        customer: {
            name: "Dr. Joshua Morar",
            email: "joshua.m@example.com",
            avatar: "https://i.pravatar.cc/150?img=10",
        },
        cleaner: {
            name: "Dr. Joshua Morar",
            avatar: "https://i.pravatar.cc/150?img=20",
        },
        jobStatus: "Upcoming",
        paymentStatus: "Held",
        date: "20-09-2025",
        amountPaid: 190,
    },
    {
        id: 11,
        jobId: "AM10435",
        jobType: "Pet Sitter",
        customer: {
            name: "Selina K",
            email: "selina.k@example.com",
            avatar: "https://i.pravatar.cc/150?img=1",
        },
        cleaner: {
            name: "Lori Mosciski",
            avatar: "https://i.pravatar.cc/150?img=11",
        },
        jobStatus: "Cancelled",
        paymentStatus: "Cancelled",
        date: "20-09-2025",
        amountPaid: null,
    },
    {
        id: 12,
        jobId: "AM10436",
        jobType: "Cleaning",
        customer: {
            name: "George L",
            email: "george.l@example.com",
            avatar: "https://i.pravatar.cc/150?img=2",
        },
        cleaner: {
            name: "Randolph Hirthe",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
        jobStatus: "Completed",
        paymentStatus: "Released",
        date: "21-09-2025",
        amountPaid: 350,
    },
    {
        id: 13,
        jobId: "AM10437",
        jobType: "Handyman",
        customer: {
            name: "Naomi P",
            email: "naomi.p@example.com",
            avatar: "https://i.pravatar.cc/150?img=3",
        },
        cleaner: {
            name: "Constance Harris",
            avatar: "https://i.pravatar.cc/150?img=13",
        },
        jobStatus: "Ongoing",
        paymentStatus: "Held",
        date: "21-09-2025",
        amountPaid: 280,
    },
    {
        id: 14,
        jobId: "AM10438",
        jobType: "Pet Sitter",
        customer: {
            name: "Guy Brakus",
            email: "guy.b@example.com",
            avatar: "https://i.pravatar.cc/150?img=4",
        },
        cleaner: {
            name: "Guy Brakus",
            avatar: "https://i.pravatar.cc/150?img=14",
        },
        jobStatus: "Completed",
        paymentStatus: "Released",
        date: "21-09-2025",
        amountPaid: 160,
    },
    {
        id: 15,
        jobId: "AM10439",
        jobType: "Housekeeping",
        customer: {
            name: "Andre Abshire",
            email: "andre.a@example.com",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
        cleaner: {
            name: "Andre Abshire",
            avatar: "https://i.pravatar.cc/150?img=15",
        },
        jobStatus: "Upcoming",
        paymentStatus: "Held",
        date: "22-09-2025",
        amountPaid: 300,
    },
];

export default function JobsTable({ onViewJob }) {
    const [jobs, setJobs] = useState(defaultJobs);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [jobStatusFilter, setJobStatusFilter] = useState("");
    const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const jobTypeOptions = [
        "Cleaning",
        "Handyman",
        "Support Service Provider",
        "Housekeeping",
        "Pet Sitter",
    ];

    const jobStatusOptions = ["Completed", "Ongoing", "Upcoming", "Cancelled"];
    const paymentStatusOptions = ["Released", "Held", "Cancelled"];

    // Helper function to parse date string (DD-MM-YYYY) to Date object
    const parseDateString = (dateStr) => {
        if (!dateStr) return null;
        const [day, month, year] = dateStr.split("-");
        return new Date(year, month - 1, day);
    };

    // Helper function to format date to DD-MM-YYYY
    const formatDate = (date) => {
        if (!date) return "";
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Filter jobs based on search and filters
    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                !searchQuery ||
                job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.cleaner.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesJobType = !jobTypeFilter || job.jobType === jobTypeFilter;
            const matchesJobStatus = !jobStatusFilter || job.jobStatus === jobStatusFilter;
            const matchesPaymentStatus =
                !paymentStatusFilter || job.paymentStatus === paymentStatusFilter;

            // Date filtering logic
            let matchesDate = true;
            if (dateFilter) {
                const jobDate = parseDateString(job.date);
                if (dateFilter.start && dateFilter.end) {
                    // Date range filtering
                    const startDate = new Date(dateFilter.start);
                    const endDate = new Date(dateFilter.end);
                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(23, 59, 59, 999);
                    matchesDate = jobDate >= startDate && jobDate <= endDate;
                } else if (dateFilter.start) {
                    // Single date filtering
                    const filterDate = new Date(dateFilter.start);
                    filterDate.setHours(0, 0, 0, 0);
                    const jobDateStart = new Date(jobDate);
                    jobDateStart.setHours(0, 0, 0, 0);
                    matchesDate = jobDateStart.getTime() === filterDate.getTime();
                }
            }

            return (
                matchesSearch &&
                matchesJobType &&
                matchesJobStatus &&
                matchesPaymentStatus &&
                matchesDate
            );
        });
    }, [
        jobs,
        searchQuery,
        jobTypeFilter,
        jobStatusFilter,
        paymentStatusFilter,
        dateFilter,
    ]);

    // Paginate filtered jobs
    const paginatedJobs = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredJobs.slice(startIndex, endIndex);
    }, [filteredJobs, currentPage, itemsPerPage]);

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

    const getJobStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return {
                    dot: "bg-[#17C653]",
                    text: "text-[#17C653]",
                    bg: "bg-[#EAFFF1]",
                    border: "border-[#17C65333]",
                };
            case "Ongoing":
                return {
                    dot: "bg-[#F6B100]",
                    text: "text-[#F6B100]",
                    bg: "bg-[#FFF8DD]",
                    border: "border-[#F6B10033]",
                };
            case "Upcoming":
                return {
                    dot: "bg-[#2563EB]",
                    text: "text-[#2563EB]",
                    bg: "bg-[#EBF2FD]",
                    border: "border-[#2563EB33]",
                };
            case "Cancelled":
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

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case "Released":
                return {
                    dot: "bg-[#17C653]",
                    text: "text-[#17C653]",
                    bg: "bg-[#EAFFF1]",
                    border: "border-[#17C65333]",
                };
            case "Held":
                return {
                    dot: "bg-[#F6B100]",
                    text: "text-[#F6B100]",
                    bg: "bg-[#FFF8DD]",
                    border: "border-[#F6B10033]",
                };
            case "Cancelled":
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

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchQuery,
        jobTypeFilter,
        jobStatusFilter,
        paymentStatusFilter,
        dateFilter,
        itemsPerPage,
    ]);

    return (
        <>

            <PageHeader
                title="Jobs"
                showBackArrow={false}
            />
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">

                {/* Filters Section */}
                <div className="p-3 md:p-4 border-b border-gray-200">
                    <div className="flex flex-col xl:flex-row gap-3 md:gap-4 items-stretch xl:items-center justify-between">
                        {/* Search */}
                        <SearchInput
                            placeholder="Search by Job ID, Customer Name, Cleaner Name"
                            onChange={setSearchQuery}
                            className="md:w-[300px]"
                        />

                        {/* Filters */}
                        <div className="w-full xl:w-auto flex flex-col sm:flex-row xl:flex-row xl:flex-nowrap gap-2 md:gap-3">
                            <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-36">
                                <CustomSelect
                                    value={jobStatusFilter}
                                    onChange={setJobStatusFilter}
                                    placeholder="Job Status"
                                    options={jobStatusOptions}
                                    className="w-full"
                                />
                            </div>
                            <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-40">
                                <CustomSelect
                                    value={jobTypeFilter}
                                    onChange={setJobTypeFilter}
                                    placeholder="Job Type"
                                    options={jobTypeOptions}
                                    className="w-full"
                                />
                            </div>



                            <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-40">
                                <CustomSelect
                                    value={paymentStatusFilter}
                                    onChange={setPaymentStatusFilter}
                                    placeholder="Payment Status"
                                    options={paymentStatusOptions}
                                    className="w-full"
                                />
                            </div>

                            <div className="w-full sm:w-auto sm:flex-1 xl:flex-none xl:w-40">
                                <DatePicker
                                    label="Date Range"
                                    value={dateFilter}
                                    onChange={setDateFilter}
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
                                    <div className="flex items-center justify-center">
                                        <Checkbox
                                            checked={selectAll}
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                        />
                                    </div>
                                </th>
                                <th className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
                                            Job ID
                                        </span>
                                        <img
                                            src={tableSortIcon}
                                            alt="sort"
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                        />
                                    </div>
                                </th>
                                <th className="min-w-[120px] md:min-w-[150px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
                                            Job Type
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
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
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
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
                                            Cleaner
                                        </span>
                                        <img
                                            src={tableSortIcon}
                                            alt="sort"
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                        />
                                    </div>
                                </th>
                                <th className="min-w-[120px] md:min-w-[140px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
                                            Job Status
                                        </span>
                                        <img
                                            src={tableSortIcon}
                                            alt="sort"
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                        />
                                    </div>
                                </th>
                                <th className="min-w-[130px] md:min-w-[150px] px-2 md:px-4 py-2 md:py-3 text-left border-r border-gray-200">
                                    <div className="flex items-center gap-1.5 md:gap-2">
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
                                            Payment Status
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
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
                                            Date
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
                                        <span className="font-medium text-gray-700 text-[10px] md:text-xs">
                                            Amount Paid
                                        </span>
                                        <img
                                            src={tableSortIcon}
                                            alt="sort"
                                            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                        />
                                    </div>
                                </th>
                                <th className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-3 text-center">
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedJobs.map((job) => {
                                const jobStatusColors = getJobStatusColor(job.jobStatus);
                                const paymentStatusColors = getPaymentStatusColor(
                                    job.paymentStatus
                                );
                                return (
                                    <tr
                                        key={job.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
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
                                        <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                            <span className="font-medium text-primary text-xs md:text-sm">
                                                {job.jobId}
                                            </span>
                                        </td>
                                        <td className="min-w-[120px] md:min-w-[150px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                            <span className="text-primary font-medium text-xs md:text-sm">
                                                {job.jobType}
                                            </span>
                                        </td>
                                        <td className="min-w-[180px] md:min-w-[220px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                {job.customer.avatar ? (
                                                    <img
                                                        src={job.customer.avatar}
                                                        alt={job.customer.name}
                                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                        <User2 size={16} className="text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-medium text-primary text-xs md:text-sm truncate">
                                                        {job.customer.name}
                                                    </p>
                                                    <p className="text-xs md:text-sm text-primary-light truncate">
                                                        {job.customer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="min-w-[150px] md:min-w-[180px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                {job.cleaner.avatar ? (
                                                    <img
                                                        src={job.cleaner.avatar}
                                                        alt={job.cleaner.name}
                                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                                        <User2 size={16} className="text-gray-400" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="font-medium text-primary text-xs md:text-sm truncate">
                                                        {job.cleaner.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="min-w-[120px] md:min-w-[140px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs md:text-sm font-medium ${jobStatusColors.bg} ${jobStatusColors.border} ${jobStatusColors.text}`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${jobStatusColors.dot}`}
                                                />
                                                {job.jobStatus}
                                            </span>
                                        </td>
                                        <td className="min-w-[130px] md:min-w-[150px] px-2 md:px-4 py-2 md:py-4 border-r border-gray-200">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs md:text-sm font-medium ${paymentStatusColors.bg} ${paymentStatusColors.border} ${paymentStatusColors.text}`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${paymentStatusColors.dot}`}
                                                />
                                                {job.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                                            {job.date}
                                        </td>
                                        <td className="min-w-[100px] md:min-w-[120px] px-2 md:px-4 py-2 md:py-4 text-primary font-medium border-r border-gray-200 text-xs md:text-sm">
                                            {job.amountPaid !== null ? (
                                                <span>AU${job.amountPaid.toLocaleString()}</span>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                        <td className="w-16 md:w-20 px-2 md:px-4 py-2 md:py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => onViewJob && onViewJob(job)}
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
                    totalItems={filteredJobs.length}
                    onPageChange={setCurrentPage}
                    onRowsPerPageChange={setItemsPerPage}
                />
            </div>
        </>
    );
}

