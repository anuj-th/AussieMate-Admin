import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Approvals from "../pages/Approvals";
import Jobs from "../pages/Jobs";
import Cleaners from "../pages/Cleaners";
import Customers from "../pages/Customers";
import Payments from "../pages/Payments";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/approvals" element={<Approvals />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:jobId" element={<Jobs />} />
      <Route path="/cleaners" element={<Cleaners />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

