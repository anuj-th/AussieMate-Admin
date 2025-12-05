import { useState } from "react";
import ApprovalsTable from "../components/approvals/ApprovalsTable";
import ApprovalsDetails from "../components/approvals/ApprovalsDetails";
import PageHeader from "../layout/PageHeader";

export default function Approvals() {
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  const handleBack = () => {
    setSelectedCleaner(null);
  };

  return (
    <div>
      <PageHeader
        title={selectedCleaner ? selectedCleaner.name : "Approvals"}
        showBackArrow={!!selectedCleaner}
        onBack={selectedCleaner ? handleBack : undefined}
      />

      {selectedCleaner ? (
        <ApprovalsDetails cleaner={selectedCleaner} onBackToList={handleBack} />
      ) : (
        <ApprovalsTable onViewCleaner={setSelectedCleaner} />
      )}
    </div>
  );
}

