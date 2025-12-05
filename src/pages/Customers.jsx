import CustomersTable from "../components/customers/CustomersTable";
import PageHeader from "../layout/PageHeader";

export default function Customers() {
  const handleViewCustomer = (customer) => {
    // TODO: Navigate to customer details page or open modal
    console.log("View customer:", customer);
  };

  return (
    <div>
      <PageHeader title="Customers" showBackArrow={false} />
      <CustomersTable onViewCustomer={handleViewCustomer} />
    </div>
  );
}

