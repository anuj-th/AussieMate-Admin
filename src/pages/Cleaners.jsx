import { useState } from "react";
import CleanersTable from "../components/cleaners/CleanersTable";
import CleanerDetails from "../components/cleaners/CleanerDetails";
import PageHeader from "../layout/PageHeader";

export default function Cleaners() {
  const [selectedCleaner, setSelectedCleaner] = useState(null);

  const handleBack = () => {
    setSelectedCleaner(null);
  };

  return (
    <div>
      <PageHeader
        title={selectedCleaner ? selectedCleaner.name : "Cleaners"}
        showBackArrow={!!selectedCleaner}
        onBack={selectedCleaner ? handleBack : undefined}
      />

      {selectedCleaner ? (
        <CleanerDetails cleaner={selectedCleaner} onBackToList={handleBack} />
      ) : (
        <CleanersTable onViewCleaner={setSelectedCleaner} />
      )}
    </div>
  );
}

