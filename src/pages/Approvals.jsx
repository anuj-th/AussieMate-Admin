import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApprovalsTable from "../components/approvals/ApprovalsTable";
import ApprovalsDetails from "../components/approvals/ApprovalsDetails";
import PageHeader from "../layout/PageHeader";
import { useBreadcrumb } from "../context/BreadcrumbContext";

export default function Approvals() {
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const { setExtraCrumbs, setParentBreadcrumbOnClick } = useBreadcrumb();
  const navigate = useNavigate();
  const location = useLocation();
  const { cleanerId } = useParams();

  const handleBack = useCallback(() => {
    setSelectedCleaner(null);
    navigate("/approvals", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (location.state?.cleaner) {
      setSelectedCleaner(location.state.cleaner);
    }
    // Note: If cleanerId is in URL but no location.state, 
    // the table component would need to expose data via ref to find the cleaner
  }, [location.state, cleanerId]);

  const handleViewCleaner = (cleaner) => {
    setSelectedCleaner(cleaner);
    const id = cleaner.id || cleaner._id;
    if (id) {
      navigate(`/approvals/${id}`, { state: { cleaner }, replace: true });
    }
  };

  // Update breadcrumbs when cleaner is selected
  useEffect(() => {
    if (selectedCleaner?.name) {
      setExtraCrumbs([
        { 
          label: selectedCleaner.name, 
          path: null 
        }
      ]);
      setParentBreadcrumbOnClick(() => handleBack);
    } else {
      setExtraCrumbs([]);
      setParentBreadcrumbOnClick(null);
    }
  }, [selectedCleaner, setExtraCrumbs, setParentBreadcrumbOnClick, handleBack]);

  // Cleanup: clear breadcrumbs when component unmounts
  useEffect(() => {
    return () => {
      setExtraCrumbs([]);
      setParentBreadcrumbOnClick(null);
    };
  }, [setExtraCrumbs, setParentBreadcrumbOnClick]);

  return (
    <div>
      <PageHeader
        title={selectedCleaner ? selectedCleaner.name : "Cleaner Approval Queue"}
        showBackArrow={!!selectedCleaner}
        onBack={selectedCleaner ? handleBack : undefined}
      />

      {selectedCleaner ? (
        <ApprovalsDetails cleaner={selectedCleaner} onBackToList={handleBack} />
      ) : (
        <ApprovalsTable onViewCleaner={handleViewCleaner} />
      )}
    </div>
  );
}

