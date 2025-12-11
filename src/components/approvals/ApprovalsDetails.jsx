import { useState } from "react";
import {
  Star,
  FileText,
  CheckCircle2,
  CheckCircle2 as ApproveIcon,
  XCircle,
  Ban,
} from "lucide-react";
import approvalsBg from "../../assets/image/approvalsBg.svg";
import approveKycImg from "../../assets/image/approveKyc.svg";
import rejectKycImg from "../../assets/image/rejectKyc.svg";
import suspenseKycImg from "../../assets/image/suspenseKyc.svg";
import silverTierIcon from "../../assets/icon/silver.svg";
import goldTierIcon from "../../assets/icon/gold.svg";
import bronzeTierIcon from "../../assets/icon/bronze.svg";
import CustomMenu from "../common/CustomMenu";
import Checkbox from "../common/Checkbox";
import ActionModal from "../common/ActionModal";
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

export default function ApprovalsDetails({ cleaner, onBackToList }) {
  if (!cleaner) return null;

  const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);
  const [activeAction, setActiveAction] = useState(null); // "approve" | "reject" | "suspend" | null

  const tier = cleaner.tier || "Silver";
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

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto ">
      {/* Profile header */}
      <div
        className="px-4 sm:px-6 md:px-10 pt-8 md:pt-10 pb-6 relative overflow-hidden rounded-2xl"
        style={{
          backgroundImage: `url(${approvalsBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Top-right actions menu */}
        <div className="w-full flex justify-end mb-4">
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
            <h2 className="text-lg font-semibold text-primary">
              {cleaner.name}
            </h2>

            {/* Role, joined date, jobs completed */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-1 text-sm text-[#78829D]">
              <span className="flex items-center gap-1.5">
                <span>{cleaner.role || "Professional Cleaner"}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>Joined: {cleaner.joined}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span>Jobs Completed: 128</span>
              </span>
            </div>
          </div>

          {/* Rating & Tier */}
          <div className="flex items-center justify-center gap-3 mt-4 ">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-[#FFF8DD] border border-[#F6B10033] text-[#F6B100]">
              <Star size={14} className="text-[#F6B100] fill-[#F6B100]" />
              <span>4.8</span>
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563]">
              <img src={tierIcon} alt={tierLabel} className="w-4 h-4" />
              <span>{tierLabel}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Documents gallery */}
      <div className="bg-white rounded-[12px] border border-[#EEF0F5] shadow-sm overflow-hidden">
        <div className="px-4 md:px-6 py-3 border-b border-[#EEF0F5]">
          <h3 className="font-semibold text-primary">
            Documents Gallery
          </h3>
        </div>

        <div className="divide-y divide-[#F3F4F6]">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4 font-medium min-w-0"
            >
              {/* Label */}
              <div className="w-full md:w-1/5 flex items-center gap-2 text-sm text-primary ">
                <span className="text-primary font-medium">{doc.id}.</span>
                <span className="font-medium text-primary">
                  {doc.label}
                </span>
              </div>

              {/* Value + status/actions */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                {/* ABN row with checkbox + value */}
                {doc.type === "abn" && (
                  <div className="flex w-full items-center gap-3">
                    <div className="flex-1">
                      <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-md px-3 py-2 text-sm text-[#111827]">
                        {doc.value}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
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
                      Verified
                    </div>
                  </div>
                )}

                {/* Text value rows (non‑ABN) */}
                {doc.type === "text" && doc.label !== "ABN Number" && (
                  <div className="w-full md:w-2/3">
                    <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-md px-3 py-2 text-xs text-[#111827]">
                      {doc.value}
                    </div>
                  </div>
                )}

                {/* File rows with red PDF icon */}
                {doc.type === "file" && (
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-xs font-medium cursor-pointer w-full md:w-auto"
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
                  <div className="w-full md:w-32 h-20 border border-[#E5E7EB] rounded-md overflow-hidden bg-[#F9FAFB] flex items-center justify-center text-[10px] text-[#9CA3AF]">
                    Preview
                  </div>
                )}

                {/* Status / actions (skip for ABN row) */}
                {doc.type !== "abn" && (
                  <div className="flex items-center gap-3 text-sm md:ml-auto justify-start md:justify-end">
                    {doc.status === "Verified" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#EAFFF1] text-[#17C653] border border-[#17C65333] ">
                        <CheckCircle2 size={14} />
                        Verified
                      </span>
                    )}

                    {doc.status === "Approved" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#EAFFF1] text-[#17C653] border border-[#17C65333] !cursor-pointer">
                        <CheckCircle2 size={14} />
                        Approved
                      </span>
                    )}

                    {doc.status === "Rejected" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FFE5E9] text-[#F1416C] border border-[#F1416C33] !cursor-pointer">
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
              ? `This will enable her to receive jobs in her radius (${cleaner.radius || "0–20 km"}).`
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

