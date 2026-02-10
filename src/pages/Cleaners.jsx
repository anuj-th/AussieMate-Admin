import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CleanersTable from "../components/cleaners/CleanersTable";
import CleanerDetails from "../components/cleaners/CleanerDetails";
import PageHeader from "../layout/PageHeader";
import { useBreadcrumb } from "../context/BreadcrumbContext";

export default function Cleaners() {
  const [selectedCleaner, setSelectedCleaner] = useState(null);
  const [isViewingJob, setIsViewingJob] = useState(false);
  const { setExtraCrumbs, setParentBreadcrumbOnClick } = useBreadcrumb();
  const navigate = useNavigate();
  const location = useLocation();
  const { cleanerId } = useParams();

  const handleBack = useCallback(() => {
    setSelectedCleaner(null);
    setIsViewingJob(false);
    navigate("/cleaners", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (location.state?.cleaner) {
      setSelectedCleaner(location.state.cleaner);
      setIsViewingJob(false);
    }
  }, [location.state, cleanerId]);

  const handleViewCleaner = (cleaner) => {
    setSelectedCleaner(cleaner);
    setIsViewingJob(false);
    const id = cleaner.id || cleaner._id;
    if (id) {
      navigate(`/cleaners/${id}`, { state: { cleaner }, replace: true });
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
      {!isViewingJob && (
        <PageHeader
          title={selectedCleaner ? selectedCleaner.name : "Cleaners"}
          showBackArrow={!!selectedCleaner}
          onBack={selectedCleaner ? handleBack : undefined}
        />
      )}

      {selectedCleaner ? (
        <CleanerDetails
          cleaner={selectedCleaner}
          onBackToList={handleBack}
          onJobViewDetail={setIsViewingJob}
        />
      ) : (
        <CleanersTable onViewCleaner={handleViewCleaner} />
      )}
    </div>
  );
}

