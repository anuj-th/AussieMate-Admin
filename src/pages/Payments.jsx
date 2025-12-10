import { useState } from "react";
import PaymentStatsCards from "../components/payment/PaymentStatsCards";
import PaymentsTable from "../components/payment/PaymentsTable";
import TransactionDetailModal from "../components/payment/TransactionDetailModal";
import PageHeader from "../layout/PageHeader";

export default function Payments() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Payments & Escrow" showBackArrow={false} />
      <PaymentStatsCards />
      <PaymentsTable onViewTransaction={handleViewTransaction} />
      <TransactionDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </div>
  );
}

