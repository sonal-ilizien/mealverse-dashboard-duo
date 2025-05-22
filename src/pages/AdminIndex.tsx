
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CooksManagement from "@/pages/admin/CooksManagement";

const AdminIndex = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/cooks" element={<CooksManagement />} />
        {/* Placeholder routes for future implementation */}
        <Route path="/users" element={<div className="p-12 text-center">Users Management - Coming Soon</div>} />
        <Route path="/meals" element={<div className="p-12 text-center">Meals Overview - Coming Soon</div>} />
        <Route path="/reports" element={<div className="p-12 text-center">Reports & Flags - Coming Soon</div>} />
        <Route path="/notifications" element={<div className="p-12 text-center">Notifications - Coming Soon</div>} />
        <Route path="/settings" element={<div className="p-12 text-center">Settings - Coming Soon</div>} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminIndex;
