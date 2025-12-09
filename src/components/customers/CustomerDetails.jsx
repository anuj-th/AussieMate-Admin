import { useState } from "react";
import {
  Ban,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";
import CustomMenu from "../common/CustomMenu";
import ActionModal from "../common/ActionModal";
import suspenseKycImg from "../../assets/image/suspenseKyc.svg";
import approvalsBg from "../../assets/image/approvalsBg.svg";
import OverviewTab from "./OverviewTab";
import JobsHistoryTab from "./JobsHistoryTab";
import PaymentsTab from "./PaymentsTab";
import FeedbackTab from "./FeedbackTab";

export default function CustomerDetails({ customer, onBackToList }) {
  if (!customer) return null;

  const [activeAction, setActiveAction] = useState(null); // "suspend" | null
  const [activeTab, setActiveTab] = useState("overview");

  const closeModal = () => setActiveAction(null);

  const tabs = [
    { id: "overview", label: "Overview (Default)" },
    { id: "jobsHistory", label: "Jobs History" },
    { id: "payments", label: "Payments & Escrow" },
    { id: "feedback", label: "Feedback" },
  ];

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "10 Jul 2025";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format phone number (remove +61 and format)
  const formatPhone = (phone) => {
    if (!phone) return "234 435 546";
    return phone.replace(/\+61\s?/, "").replace(/\s/g, " ");
  };

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
        <div className="absolute top-4 right-4 flex items-center gap-3">
          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#EAFFF1] border border-[#17C65333] text-[#17C653]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17C653]"></span>
            {customer.status || "Active"}
          </span>
          
          {/* Menu */}
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
              src={customer.avatar}
              alt={customer.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            {/* Name */}
            <h2 className="text-base md:text-lg font-semibold text-primary">
              {customer.name}
            </h2>

            {/* Contact info */}
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mt-1 text-xs md:text-sm text-primary-light font-medium">
              <span className="flex items-center gap-1.5">
                <Mail size={12} className="md:w-[14px] md:h-[14px]" />
                <span>{customer.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="md:w-[14px] md:h-[14px]" />
                <span>{formatPhone(customer.phone)}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} className="md:w-[14px] md:h-[14px]" />
                <span>Joined: {formatDate(customer.joined)}</span>
              </span>
            </div>
          </div>

          {/* Total Spend Box */}
          <div className="mt-4 px-3 md:px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md">
            <span className="text-xs md:text-sm font-medium">
              <span className="text-primary">Total Spend</span>{" "}
              <span className="text-primary-light font-semibold">
                AU${customer.spend || "3,240"}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-[#EEF0F5]">
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
        {activeTab === "overview" && <OverviewTab customer={customer} />}
        {activeTab === "jobsHistory" && <JobsHistoryTab customer={customer} />}
        {activeTab === "payments" && <PaymentsTab customer={customer} />}
        {activeTab === "feedback" && <FeedbackTab customer={customer} />}
      </div>

      {/* Global action modal for Suspend */}
      {activeAction && (
        <ActionModal
          isOpen={!!activeAction}
          onClose={closeModal}
          illustration={
            <img
              src={suspenseKycImg}
              alt="Suspend customer"
              className="max-h-52 w-auto"
            />
          }
          title={`Suspend ${customer.name}`}
          description={`Are you sure you want to suspend ${customer.name}?`}
          primaryLabel="Yes, Suspend"
          primaryVariant="danger"
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

