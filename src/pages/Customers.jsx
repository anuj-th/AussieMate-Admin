import { useState } from "react";
import CustomersTable from "../components/customers/CustomersTable";
import CustomerDetails from "../components/customers/CustomerDetails";
import PageHeader from "../layout/PageHeader";

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleBack = () => {
    setSelectedCustomer(null);
  };

  return (
    <div className="w-6xl mx-auto">
      <PageHeader
        title={selectedCustomer ? selectedCustomer.name : "Customers"}
        showBackArrow={!!selectedCustomer}
        onBack={selectedCustomer ? handleBack : undefined}
      />

      {selectedCustomer ? (
        <CustomerDetails customer={selectedCustomer} onBackToList={handleBack} />
      ) : (
        <CustomersTable onViewCustomer={setSelectedCustomer} />
      )}
    </div>
  );
}

