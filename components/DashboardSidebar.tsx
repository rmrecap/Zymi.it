// *********************
// Role of the component: Sidebar on admin dashboard page
// Name of the component: DashboardSidebar.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <DashboardSidebar />
// Input parameters: no input parameters
// Output: sidebar for admin dashboard page
// *********************

import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaTable, FaIndustry, FaAmazon } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { FaGear } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { FaStore } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <div className="xl:w-[400px] bg-slate-900 h-full max-xl:w-full border-r border-slate-800">
      <Link href="/admin">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <MdDashboard className="text-xl text-indigo-400" />
          <span>Dashboard</span>
        </div>
      </Link>
      <Link href="/admin/b2b-leads">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaIndustry className="text-xl text-amber-400" />
          <span>B2B RFQ Leads</span>
        </div>
      </Link>
      <Link href="/admin/amazon-sync">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaAmazon className="text-xl text-[#FF9900]" />
          <span>Amazon Sync & Affiliates</span>
        </div>
      </Link>
      <Link href="/admin/orders">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaBagShopping className="text-xl text-slate-300" />
          <span>Orders</span>
        </div>
      </Link>
      <Link href="/admin/products">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaTable className="text-xl text-slate-300" />
          <span>Products</span>
        </div>
      </Link>
      <Link href="/admin/bulk-upload">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaFileUpload className="text-xl text-slate-300" />
          <span>Bulk Upload</span>
        </div>
      </Link>
      <Link href="/admin/categories">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <MdCategory className="text-xl text-slate-300" />
          <span>Categories</span>
        </div>
      </Link>
      <Link href="/admin/users">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaRegUser className="text-xl text-slate-300" />
          <span>Users</span>
        </div>
      </Link>
      <Link href="/admin/merchant">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaStore className="text-xl text-slate-300" />
          <span>Merchant</span>
        </div>
      </Link>
      <Link href="/admin/settings">
        <div className="flex gap-x-3 w-full hover:bg-slate-800 cursor-pointer items-center py-5 pl-5 text-lg text-white font-medium transition">
          <FaGear className="text-xl text-slate-300" />
          <span>Settings</span>
        </div>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
