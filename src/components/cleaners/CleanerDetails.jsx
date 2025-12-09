import { useState } from "react";
import {
  Star,
  Ban,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import silverTierIcon from "../../assets/icon/silver.svg";
import goldTierIcon from "../../assets/icon/gold.svg";
import bronzeTierIcon from "../../assets/icon/bronze.svg";
import CustomMenu from "../common/CustomMenu";
import ActionModal from "../common/ActionModal";
import approveKycImg from "../../assets/image/approveKyc.svg";
import rejectKycImg from "../../assets/image/rejectKyc.svg";
import suspenseKycImg from "../../assets/image/suspenseKyc.svg";
import approvalsBg from "../../assets/image/approvalsBg.svg";
import OverviewTab from "./OverviewTab";
import DocumentsTab from "./DocumentsTab";
import JobHistoryTab from "./JobHistoryTab";
import EarningsTab from "./EarningsTab";
import FeedbackTab from "./FeedbackTab";

export default function CleanerDetails({ cleaner, onBackToList }) {
  if (!cleaner) return null;

  const [activeAction, setActiveAction] = useState(null); // "approve" | "reject" | "suspend" | null
  const [activeTab, setActiveTab] = useState("overview");

  const tier = cleaner.badge || "Silver";
  const tierLabel = `${tier.charAt(0).toUpperCase()}${tier.slice(1).toLowerCase()} Tier`;

  const tierIcon =
    tier.toLowerCase() === "gold"
      ? goldTierIcon
      : tier.toLowerCase() === "bronze"
      ? bronzeTierIcon
      : silverTierIcon;

  const closeModal = () => setActiveAction(null);

  const tabs = [
    { id: "overview", label: "Overview (Default)" },
    { id: "documents", label: "Documents & KYC" },
    { id: "jobHistory", label: "Job History" },
    { id: "earnings", label: "Earnings & Payouts" },
    { id: "feedback", label: "Feedback & Ratings" },
  ];

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto">
      {/* Profile header */}
      <div
        className="px-4 md:px-6 lg:px-10 pt-8 md:pt-10 pb-6 relative overflow-hidden bg-white rounded-[20px] border border-[#EEF0F5] shadow-sm"
        style={{
          backgroundImage: `url(${approvalsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Top-right actions menu */}
        <div className="absolute top-4 right-4">
          <CustomMenu
            align="right"
            items={[
              {
                id: "suspend",
                label: "Suspend",
                icon: <Ban size={18} className="text-[#9CA3AF]" />,
                onClick: () => {
                  setActiveAction("suspend");
                },
              },
            ]}
          />
        </div>

        <div className="relative flex flex-col items-center text-center gap-2">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-[#EBF2FD] shadow-md mb-1 bg-white">
            <img
              src={cleaner.avatar}
              alt={cleaner.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            {/* Name + role in a single row */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <h2 className="text-base md:text-lg font-semibold text-primary">
                {cleaner.name}
              </h2>
              {cleaner.role && (
                <span className="text-xs md:text-sm text-[#9CA3AF]">
                  • {cleaner.role}
                </span>
              )}
            </div>

            {/* Joined date, jobs completed, location */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-1 text-xs md:text-sm text-primary-light font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="md:w-[14px] md:h-[14px]" />
                <span>Parramatta, NSW</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={12} className="md:w-[14px] md:h-[14px]" />
                <span>Jobs Completed: {cleaner.jobs || 128}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="md:w-[14px] md:h-[14px]" />
                <span>Joined: {cleaner.joined || "12 Jul 2025"}</span>
              </span>
            </div>
          </div>

          {/* Earnings Box */}
          <div className="mt-4 px-3 md:px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md">
            <span className="text-xs md:text-sm font-medium">
              <span className="text-primary">Earnings</span>{" "}
              <span className="text-primary-light font-semibold">AU${cleaner.earnings?.toLocaleString() || "12,420"}</span>
            </span>
          </div>

          {/* Rating & Tier */}
          <div className="flex items-center justify-center gap-2 md:gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium bg-[#FFF4E0] border border-[#F6B10033] text-[#F6B100]">
              <Star size={12} className="md:w-[14px] md:h-[14px] text-[#F6B100] fill-[#F59E0B]" />
              <span>{cleaner.rating || 4.2}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563]">
              <img src={tierIcon} alt={tierLabel} className="w-3 h-3 md:w-4 md:h-4" />
              <span>{tierLabel}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation - No background, border, or shadow */}
        <div className="border-b border-[#EEF0F5] ">
        <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#1F6FEB] text-[#1F6FEB] font-medium"
                    : "border-transparent text-[#78829D] hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

      {/* Tab Heading */}
      <div className="mt-4">
        <h2 className="font-semibold text-primary">
          {tabs.find((tab) => tab.id === activeTab)?.label || "Overview (Default)"}
        </h2>
              </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "overview" && <OverviewTab cleaner={cleaner} />}
        {activeTab === "documents" && <DocumentsTab cleaner={cleaner} />}
        {activeTab === "jobHistory" && <JobHistoryTab cleaner={cleaner} />}
        {activeTab === "earnings" && <EarningsTab cleaner={cleaner} />}
        {activeTab === "feedback" && <FeedbackTab cleaner={cleaner} />}
      </div>

      {/* Global action modal for Approve / Reject / Suspend */}
      {activeAction && (
        <ActionModal
          isOpen={!!activeAction}
          onClose={closeModal}
          illustration={
            <img
              src={
                activeAction === "approve"
                  ? approveKycImg
                  : activeAction === "reject"
                  ? rejectKycImg
                  : suspenseKycImg
              }
              alt={
                activeAction === "approve"
                  ? "Approve KYC"
                  : activeAction === "reject"
                  ? "Reject application"
                  : "Suspend cleaner"
              }
              className="max-h-52 w-auto"
            />
          }
          title={
            activeAction === "approve"
              ? `Approve ${cleaner.name} as Professional Cleaner?`
              : activeAction === "reject"
              ? "Reject Application"
              : `Suspend ${cleaner.name}`
          }
          description={
            activeAction === "approve"
              ? "This will enable her to receive jobs in her radius (0–20 km)."
              : activeAction === "reject"
              ? `Are you sure you want to reject application of ${cleaner.name}?`
              : `Are you sure you want to suspend ${cleaner.name}?`
          }
          primaryLabel={
            activeAction === "approve"
              ? "Approve KYC"
              : activeAction === "reject"
              ? "Yes, Reject"
              : "Yes, Suspend"
          }
          primaryVariant={
            activeAction === "approve" ? "primary" : "danger"
          }
          onPrimary={() => {
            // TODO: wire up API / status updates here
            closeModal();
          }}
          hideSecondary={true}
        />
      )}
    </div>
  );
}

