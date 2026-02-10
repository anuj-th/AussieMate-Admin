import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomersTable from "../components/customers/CustomersTable";
import CustomerDetails from "../components/customers/CustomerDetails";
import PageHeader from "../layout/PageHeader";
import { useBreadcrumb } from "../context/BreadcrumbContext";

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isViewingJob, setIsViewingJob] = useState(false);
  const { setExtraCrumbs, setParentBreadcrumbOnClick } = useBreadcrumb();
  const navigate = useNavigate();
  const location = useLocation();
  const { customerId } = useParams();

  const handleBack = useCallback(() => {
    setSelectedCustomer(null);
    setIsViewingJob(false);
    navigate("/customers", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (location.state?.customer) {
      setSelectedCustomer(location.state.customer);
      setIsViewingJob(false);
    }
    // Note: If customerId is in URL but no location.state, 
    // the table component would need to expose data via ref to find the customer
  }, [location.state, customerId]);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setIsViewingJob(false);
    const id = customer.id || customer._id;
    if (id) {
      navigate(`/customers/${id}`, { state: { customer }, replace: true });
    }
  };

  // Update breadcrumbs when customer is selected
  useEffect(() => {
    if (selectedCustomer?.name) {
      setExtraCrumbs([
        {
          label: selectedCustomer.name,
          path: null
        }
      ]);
      setParentBreadcrumbOnClick(() => handleBack);
    } else {
      setExtraCrumbs([]);
      setParentBreadcrumbOnClick(null);
    }
  }, [selectedCustomer, setExtraCrumbs, setParentBreadcrumbOnClick, handleBack]);

  // Cleanup: clear breadcrumbs when component unmounts
  useEffect(() => {
    return () => {
      setExtraCrumbs([]);
      setParentBreadcrumbOnClick(null);
    };
  }, [setExtraCrumbs, setParentBreadcrumbOnClick]);

  return (
    <div className="">
      {!isViewingJob && (
        <PageHeader
          title={selectedCustomer ? selectedCustomer.name : "Customers"}
          showBackArrow={!!selectedCustomer}
          onBack={selectedCustomer ? handleBack : undefined}
        />
      )}

      {selectedCustomer ? (
        <CustomerDetails
          customer={selectedCustomer}
          onBackToList={handleBack}
          onJobViewDetail={setIsViewingJob}
        />
      ) : (
        <CustomersTable onViewCustomer={handleViewCustomer} />
      )}
    </div>
  );
}

