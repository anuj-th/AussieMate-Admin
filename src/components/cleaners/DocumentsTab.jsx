import { FileText, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import Checkbox from "../common/Checkbox";

const INITIAL_DOCUMENTS = [
    {
        id: 1,
        label: "ABN Number",
        value: "24352 65467",
        type: "abn",
        status: "Pending",
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

export default function DocumentsTab({ cleaner }) {
    const [documents, setDocuments] = useState(INITIAL_DOCUMENTS);

    const updateDocumentStatus = (id, status) => {
        setDocuments((prev) =>
            prev.map((doc) => (doc.id === id ? { ...doc, status } : doc))
        );
    };

    return (
        <div className="space-y-4">

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
                                        <div className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-md px-3 py-2 text-sm ">
                                            {doc.value}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            checked={doc.status === "Verified"}
                                            onChange={(e) => {
                                                const newStatus = e.target.checked ? "Verified" : "Pending";
                                                updateDocumentStatus(doc.id, newStatus);
                                            }}
                                            checkboxSize="w-4 h-4"
                                            className="items-center"
                                        />
                                        {doc.status === "Verified" && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 text-sm font-medium">
                                              
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
                                        className="text-[#EF4444] flex-shrink-0"
                                    />
                                    <span className="text-sm text-primary">
                                        {doc.value}
                                    </span>
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
                                                    updateDocumentStatus(
                                                        doc.id,
                                                        "Approved"
                                                    )
                                                }
                                                className="text-[#17C653] font-medium hover:underline"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateDocumentStatus(
                                                        doc.id,
                                                        "Rejected"
                                                    )
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
    );
}

