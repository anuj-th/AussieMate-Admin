import { useState, useMemo } from "react";
import StatsCards from "../components/dashboard/StatsCards";
import RecentActivity from "../components/dashboard/RecentActivity";
import TopActiveSuburbs from "../components/dashboard/TopActiveSuburbs";

export default function Dashboard() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [sortBy, setSortBy] = useState("Jobs");
  const [category, setCategory] = useState("All categories");

  const suburbsData = useMemo(() => {
    // In future this can come from API and filter by `category`
    return undefined;
  }, [category]);

  return (
    <div className="space-y-6 py-3 md:py-0">
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 w-full">
        <RecentActivity
          autoRefresh={autoRefresh}
          onAutoRefreshChange={setAutoRefresh}
        />

        <TopActiveSuburbs
          suburbs={suburbsData}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          category={category}
          onCategoryChange={setCategory}
        />
      </div>
    </div>
  );
}

