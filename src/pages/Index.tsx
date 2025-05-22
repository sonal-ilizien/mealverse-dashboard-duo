
import React from "react";
import Dashboard from "@/pages/dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Route, Routes } from "react-router-dom";
import Dishes from "@/pages/dashboard/Dishes";
import Orders from "@/pages/dashboard/Orders";
import Reviews from "@/pages/dashboard/Reviews";
import Earnings from "@/pages/dashboard/Earnings"; 
import Profile from "@/pages/dashboard/Profile";

const Index = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/dishes" element={<Dishes />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/reviews" element={<Reviews />} />
        <Route path="/dashboard/earnings" element={<Earnings />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Index;
