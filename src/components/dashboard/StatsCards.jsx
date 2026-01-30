import { useState, useEffect } from "react";
import dashKYC from "../../assets/icon/dashKYC.svg";
import dashJobs from "../../assets/icon/dashJobs.svg";
import dashHeld from "../../assets/icon/dashHeld.svg";
import dashRevenue from "../../assets/icon/dashRevenue.svg";
import { fetchCleanersKYCStats } from "../../api/services/cleanersService";
import { fetchJobsStats } from "../../api/services/jobService";

const defaultCards = [
  {
    id: 1,
    label: "Pending KYC",
    value: 0,
    icon: dashKYC,
    isDynamic: true, // Mark this card as dynamic
  },
  {
    id: 2,
    label: "Total Jobs",
    value: 0,
    icon: dashJobs,
    isDynamic: true, // Mark this card as dynamic
  },
  {
    id: 3,
    label: "Escrow Held",
    value: "$5,420",
    icon: dashHeld,
  },
  {
    id: 4,
    label: "Revenue (MTD)",
    value: "$18,640",
    icon: dashRevenue,
  },
];

export default function StatsCards({ items = defaultCards }) {
  const [pendingKYC, setPendingKYC] = useState(null); // null means data not fetched yet
  const [totalJobs, setTotalJobs] = useState(null); // null means data not fetched yet
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Fetch KYC stats
        const kycResponse = await fetchCleanersKYCStats();
        
        // Handle different response structures
        const statsData = kycResponse?.data || kycResponse;
        
        if (statsData?.statusBreakdown) {
          // Calculate pending KYC: sum of no_documents, partial, and pending_review
          // This matches the logic in ApprovalsTable.jsx
          const pendingCount = 
            (statsData.statusBreakdown.no_documents || 0) +
            (statsData.statusBreakdown.partial || 0) +
            (statsData.statusBreakdown.pending_review || 0);
          
          setPendingKYC(pendingCount);
        } else if (statsData?.pendingReview !== undefined) {
          // If API provides a direct pendingReview count, use it
          // But we should still sum the breakdown if available for accuracy
          const breakdown = statsData.statusBreakdown || {};
          const pendingCount = 
            (breakdown.no_documents || 0) +
            (breakdown.partial || 0) +
            (breakdown.pending_review || 0) ||
            statsData.pendingReview;
          
          setPendingKYC(pendingCount);
        } else {
          // No valid data found
          setPendingKYC(0);
        }
        
        // Fetch Jobs stats
        try {
          const jobsResponse = await fetchJobsStats();
          
          // Debug: log the response
          console.log('StatsCards jobsResponse:', jobsResponse);
          
          // fetchJobsStats returns { totalJobs: number }
          if (jobsResponse?.totalJobs !== undefined && jobsResponse.totalJobs !== null) {
            setTotalJobs(jobsResponse.totalJobs);
          } else {
            console.warn('StatsCards: totalJobs is undefined or null in response:', jobsResponse);
            setTotalJobs(0);
          }
        } catch (jobsError) {
          console.error('Error fetching jobs stats:', jobsError);
          setTotalJobs(0);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // Merge dynamic data with static cards
  const cards = items.map((card) => {
    if (card.isDynamic && card.label === "Pending KYC") {
      let displayValue;
      if (loading) {
        displayValue = "..."; // Loading state
      } else if (error || pendingKYC === null) {
        displayValue = "-"; // Show dash when data not available or error
      } else {
        displayValue = pendingKYC; // Show actual count
      }
      
      return {
        ...card,
        value: displayValue,
      };
    }
    
    if (card.isDynamic && card.label === "Total Jobs") {
      let displayValue;
      if (loading) {
        displayValue = "..."; // Loading state
      } else if (error || totalJobs === null) {
        displayValue = "-"; // Show dash when data not available or error
      } else {
        displayValue = totalJobs; // Show actual count
      }
      
      return {
        ...card,
        value: displayValue,
      };
    }
    
    return card;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex items-center gap-4 bg-white rounded-[20px] px-6 py-4 shadow-sm border border-[#EEF0F5]"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl">
            <img
              src={card.icon}
              alt={card.label}
              className="w-14 h-14"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[28px] font-semibold text-[#1C1C1C] leading-tight">
              {card.value}
            </span>
            <span className="text-sm font-medium text-[#7E7E87] mt-1">
              {card.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}


