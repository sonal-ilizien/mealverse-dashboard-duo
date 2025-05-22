
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CooksManagement from "@/pages/admin/CooksManagement";
import UsersManagement from "@/pages/admin/UsersManagement";
import MealsOverview from "@/pages/admin/MealsOverview";
import ReportsManagement from "@/pages/admin/ReportsManagement";
import NotificationsPage from "@/pages/admin/NotificationsPage";
import SettingsPage from "@/pages/admin/SettingsPage";

const AdminIndex = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/cooks" element={<CooksManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/meals" element={<MealsOverview />} />
        <Route path="/reports" element={<ReportsManagement />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminIndex;
