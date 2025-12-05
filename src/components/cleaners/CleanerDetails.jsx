import { useState } from "react";
import {
  Star,
  FileText,
  CheckCircle2,
  CheckCircle2 as ApproveIcon,
  XCircle,
  Ban,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import silverTierIcon from "../../assets/icon/silver.svg";
import goldTierIcon from "../../assets/icon/gold.svg";
import bronzeTierIcon from "../../assets/icon/bronze.svg";
import CustomMenu from "../common/CustomMenu";
import Checkbox from "../common/Checkbox";
import ActionModal from "../common/ActionModal";
import approveKycImg from "../../assets/image/approveKyc.svg";
import rejectKycImg from "../../assets/image/rejectKyc.svg";
import suspenseKycImg from "../../assets/image/suspenseKyc.svg";
import approvalsBg from "../../assets/image/approvalsBg.svg";

const INITIAL_DOCUMENTS = [
  {
    id: 1,
    label: "ABN Number",
    value: "24352 65467",
    type: "abn",
    status: "Verified",
  },
  {
    id: 2,
    label: "Police Check",
    value: "Police Verification.pdf",
    type: "file",
    status: "Approved",
  },
  {
    id: 3,
    label: "Photo ID",
    value: "John doe.pdf",
    type: "file",
    status: "Pending",
  },
  {
    id: 4,
    label: "Training Certificates",
    value: "Certificate.png",
    type: "image",
    status: "Pending",
  },
];

export default function CleanerDetails({ cleaner, onBackToList }) {
  if (!cleaner) return null;

  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
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

  const updateDocumentStatus = (id, status) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status } : doc))
    );
  };

  const closeModal = () => setActiveAction(null);

  const tabs = [
    { id: "overview", label: "Overview (Default)" },
    { id: "documents", label: "Documents & KYC" },
    { id: "jobHistory", label: "Job History" },
    { id: "earnings", label: "Earnings & Payouts" },
    { id: "feedback", label: "Feedback & Ratings" },
  ];

  return (
    <div className="space-y-6 w-6xl mx-auto">
      {/* Profile header */}
      <div
        className="px-6 md:px-10 pt-10 pb-6 relative overflow-hidden bg-white rounded-[20px] border border-[#EEF0F5] shadow-sm"
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
                id: "approve",
                label: "Approve (Verify KYC)",
                icon: <ApproveIcon size={18} className="text-[#2563EB]" />,
                onClick: () => {
                  setActiveAction("approve");
                },
              },
              {
                id: "reject",
                label: "Reject Application",
                icon: <XCircle size={18} className="text-[#9CA3AF]" />,
                onClick: () => {
                  setActiveAction("reject");
                },
              },
              {
                id: "suspend",
                label: "Suspend",
                icon: <Ban size={18} className="text-[#9CA3AF]" />,
                divider: true,
                onClick: () => {
                  setActiveAction("suspend");
                },
              },
            ]}
          />
        </div>

        <div className="relative flex flex-col items-center text-center gap-2">
          <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-[#EBF2FD] shadow-md mb-1 bg-white">
            <img
              src={cleaner.avatar}
              alt={cleaner.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2">
            {/* Name + role in a single row */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <h2 className="text-lg font-semibold text-primary">
                {cleaner.name}
              </h2>
              {cleaner.role && (
                <span className="text-sm text-[#9CA3AF]">
                  • {cleaner.role}
                </span>
              )}
            </div>

            {/* Joined date, jobs completed, location */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-1 text-[12px] text-[#78829D]">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                <span>Parramatta, NSW</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} />
                <span>Jobs Completed: {cleaner.jobs || 128}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>Joined: {cleaner.joined || "12 Jul 2025"}</span>
              </span>
            </div>
          </div>

          {/* Earnings Box */}
          <div className="mt-4 px-4 py-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-md">
            <span className="text-sm font-semibold text-primary">
              Earnings AU${cleaner.earnings?.toLocaleString() || "12,420"}
            </span>
          </div>

          {/* Rating & Tier */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#FFF8DD] border border-[#F6B10033] text-[#F6B100]">
              <Star size={14} className="text-[#F6B100] fill-[#F6B100]" />
              <span>{cleaner.rating || 4.8}</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563]">
              <img src={tierIcon} alt={tierLabel} className="w-4 h-4" />
              <span>{tierLabel}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-[20px] border border-[#EEF0F5] shadow-sm overflow-hidden">
        <div className="border-b border-[#EEF0F5]">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 md:px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-[#78829D] hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] flex items-center justify-center">
                    <Briefcase size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#78829D]">Jobs completed</p>
                    <p className="text-lg font-semibold text-primary">
                      {cleaner.jobs || 34}
                    </p>
                  </div>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] flex items-center justify-center">
                    <Star size={20} className="text-[#2563EB]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#78829D]">Avg Rating</p>
                    <p className="text-lg font-semibold text-primary">
                      {cleaner.rating || 4.8}
                    </p>
                  </div>
                </div>
                <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#EBF2FD] flex items-center justify-center">
                    <span className="text-[#2563EB] font-bold text-lg">$</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#78829D]">Total Earnings</p>
                    <p className="text-lg font-semibold text-primary">
                      AU${cleaner.earnings?.toLocaleString() || "12,420"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Jobs Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-primary">Recent jobs</h3>
                  <button className="text-sm text-[#2563EB] hover:underline">
                    View Jobs
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Sample Job Cards */}
                  {[1, 2, 3, 4].map((job) => (
                    <div
                      key={job}
                      className="bg-white border border-[#E5E7EB] rounded-lg p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#78829D]">
                          Pet Sitting • {job === 1 ? "Walking" : job === 2 ? "Feeding" : job === 3 ? "Boarding" : "W"}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            job === 2
                              ? "bg-[#FFF8DD] text-[#F6B100] border border-[#F6B10033]"
                              : "bg-[#EAFFF1] text-[#17C653] border border-[#17C65333]"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              job === 2 ? "bg-[#F6B100]" : "bg-[#17C653]"
                            }`}
                          />
                          {job === 2 ? "In Progress" : "Completed"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#78829D]">
                        <MapPin size={12} />
                        <span className="truncate">
                          {job === 1
                            ? "860, Hutt Street, South Australia"
                            : job === 2
                            ? "795, Market Street, Fremantle Prison..."
                            : job === 3
                            ? "375, Domain Road, Royal Botanic Gard..."
                            : "720, Roe Stre"}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#78829D]">
                        <Calendar size={12} />
                        <span>
                          {job === 1
                            ? "23 Aug, 2025"
                            : job === 2
                            ? "24 Aug, 2025"
                            : job === 3
                            ? "25 Aug, 2025"
                            : "26 Aug, 2025"}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-[#E5E7EB]">
                        <p className="text-xs text-primary font-medium">
                          Payment: ${job === 2 ? "120" : "80"}
                        </p>
                        <p className="text-[10px] text-[#78829D]">
                          Released Aug 27
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-primary mb-4">
                Documents Gallery
              </h3>
              <div className="divide-y divide-[#F3F4F6]">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4"
                  >
                    {/* Label */}
                    <div className="w-full md:w-1/5 flex items-center gap-2 text-sm text-primary">
                      <span className="text-primary">{doc.id}.</span>
                      <span className="font-medium text-primary">
                        {doc.label}
                      </span>
                    </div>

                    {/* Value + status/actions */}
                    <div className="flex-1 flex items-center gap-2 md:gap-3">
                      {/* ABN row with checkbox + value */}
                      {doc.type === "abn" && (
                        <div className="flex w-full items-center gap-3">
                          <div className="flex-1">
                            <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-md px-3 py-2 text-xs text-[#111827]">
                              {doc.value}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={doc.status === "Verified"}
                              onChange={(e) =>
                                updateDocumentStatus(
                                  doc.id,
                                  e.target.checked ? "Verified" : "Pending"
                                )
                              }
                              checkboxSize="w-4 h-4"
                              className="items-center"
                            />
                            {doc.status === "Verified" && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#EAFFF1] text-[#17C653] border border-[#17C65333] text-[11px]">
                                <CheckCircle2 size={14} />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* File rows with red PDF icon */}
                      {doc.type === "file" && (
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 text-xs font-medium"
                        >
                          <FileText
                            size={18}
                            className="text-[#EF4444]"
                          />
                          <span className="text-sm text-primary">{doc.value}</span>
                        </button>
                      )}

                      {/* Image preview */}
                      {doc.type === "image" && (
                        <div className="w-32 h-20 border border-[#E5E7EB] rounded-md overflow-hidden bg-[#F9FAFB] flex items-center justify-center text-[10px] text-[#9CA3AF]">
                          Preview
                        </div>
                      )}

                      {/* Status / actions (skip for ABN row) */}
                      {doc.type !== "abn" && (
                        <div className="ml-auto flex items-center gap-3 text-[11px]">
                          {doc.status === "Verified" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#EAFFF1] text-[#17C653] border border-[#17C65333]">
                              <CheckCircle2 size={14} />
                              Verified
                            </span>
                          )}

                          {doc.status === "Approved" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#EAFFF1] text-[#17C653] border border-[#17C65333]">
                              <CheckCircle2 size={14} />
                              Approved
                            </span>
                          )}

                          {doc.status === "Rejected" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFE5E9] text-[#F1416C] border border-[#F1416C33]">
                              <XCircle size={14} />
                              Rejected
                            </span>
                          )}

                          {doc.status === "Pending" && (
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() =>
                                  updateDocumentStatus(doc.id, "Approved")
                                }
                                className="text-[#17C653] font-medium hover:underline"
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  updateDocumentStatus(doc.id, "Rejected")
                                }
                                className="text-[#F1416C] font-medium hover:underline"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "jobHistory" && (
            <div className="text-center py-8 text-[#78829D]">
              Job History content coming soon...
            </div>
          )}

          {activeTab === "earnings" && (
            <div className="text-center py-8 text-[#78829D]">
              Earnings & Payouts content coming soon...
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="text-center py-8 text-[#78829D]">
              Feedback & Ratings content coming soon...
            </div>
          )}
        </div>
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

