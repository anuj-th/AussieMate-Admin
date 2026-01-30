import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import CustomSelect from "../common/CustomSelect";
import { fetchTopLocations } from "../../api/services/dashboardService";

export default function TopActiveSuburbs({
  title = "Top Active Suburbs",
  sortBy,
  onSortByChange,
}) {
  const sortOptions = ["Jobs", "Revenue", "Rating", "State"];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetchTopLocations();
        const list = resp?.data || resp || [];

        const mapped = Array.isArray(list)
          ? list.map((item, index) => ({
              id: item.rank || item._id || index + 1,
              name: item.city || "",
              jobs: item.jobs || 0,
              revenue: item.revenue ?? 0,
              rating: Number(item.avgRating ?? 0),
            }))
          : [];

        if (mapped.length) setRows(mapped);
      } catch (e) {
        console.warn("Failed to load top locations", e);
      }
    };

    load();
  }, []);

  const displayedRows = useMemo(() => {
    const data = [...rows];

    if (sortBy === "Jobs") {
      data.sort((a, b) => b.jobs - a.jobs);
    } else if (sortBy === "Revenue") {
      data.sort((a, b) => b.revenue - a.revenue);
    } else if (sortBy === "Rating") {
      data.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "State") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    return data;
  }, [rows, sortBy]);

  return (
    <div className="bg-white rounded-[16px] border border-[#EEF0F5] shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 sm:px-7 py-3 border-b border-[#EEF0F5] pb-3">
        <h2 className="text-sm sm:text-base font-semibold text-[#111827]">
          {title}
        </h2>

        <div className="flex items-center gap-2 sm:gap-3">
          <CustomSelect
            value={sortBy}
            onChange={onSortByChange}
            placeholder="Sort By"
            options={sortOptions}
            className="w-28"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-[480px] w-full text-[11px] sm:text-xs text-[#111827] border-collapse">
          <thead>
            <tr className="text-[11px] sm:text-xs font-medium text-[#4B5675] bg-[#FCFCFC] border-b border-[#EEF0F5]">
              <th className="w-8 pl-4 py-2 text-left font-medium">#</th>
              <th className="px-2 py-3 sm:py-4 text-left font-medium">
                Suburb / State
              </th>
              <th className="px-2 py-3 sm:py-4 text-right font-medium">Jobs</th>
              <th className="px-2 py-3 sm:py-4 text-right font-medium">
                Revenue (AU$)
              </th>
              <th className="px-2 py-3 sm:py-4 pr-4 text-right font-medium">
                Avg. Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row, idx) => (
              <tr
                key={row.id}
                className="border-b border-[#EEF0F5] text-primary font-medium text-xs sm:text-sm"
              >
                <td className="pl-4 py-3 sm:py-4 text-left">{idx + 1}</td>
                <td className="pl-4 sm:pl-6 px-2 py-3 sm:py-4 truncate">
                  {row.name}
                </td>
                <td className="px-2 py-3 sm:py-4 text-right">{row.jobs}</td>
                <td className="px-2 py-3 sm:py-4 text-right">
                  {row.revenue.toLocaleString?.() ?? row.revenue}
                </td>
                <td className="px-2 py-3 sm:py-4 pr-4">
                  <div className="flex items-center justify-end gap-1 text-[11px] sm:text-[12px]">
                    <span className="text-[#FFB020] text-[9px] sm:text-[10px]">
                      <Star size={14} className="fill-[#FFB020]" />
                    </span>
                    {row.rating.toFixed(1)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center py-3">
        <Link
          to="/jobs"
          className="text-[13px] text-[#1B84FF] font-medium underline decoration-dashed underline-offset-4 cursor-pointer"
        >
          View all Jobs
        </Link>
      </div>
    </div>
  );
}
