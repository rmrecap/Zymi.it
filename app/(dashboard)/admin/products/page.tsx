"use client";
import {
  CustomButton,
  DashboardProductTable,
  DashboardSidebar,
} from "@/components";
import React from "react";

const DashboardProducts = () => {
  return (
    <div className="bg-white flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full max-xl:flex-col max-xl:h-fit max-xl:gap-y-4">
      <DashboardSidebar />
        <DashboardProductTable />
    </div>
  );
};

export default DashboardProducts;
