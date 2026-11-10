"use client";

import React, { useEffect, useState } from "react";
import { DashboardSidebar } from "@/components";
import { FaIndustry, FaEnvelope, FaPhone, FaGlobe, FaBox, FaCheck, FaRotate, FaFilter } from "react-icons/fa6";
import toast from "react-hot-toast";

interface B2BLeadItem {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  targetQuantity: number;
  targetPrice?: string;
  fabricPreference?: string;
  specifications: string;
  sampleNeeded: boolean;
  status: string;
  createdAt: string;
  product?: {
    title: string;
    slug: string;
  };
}

export default function AdminB2BLeadsPage() {
  const [leads, setLeads] = useState<B2BLeadItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/b2b-inquiry");
      if (!res.ok) throw new Error("Failed to load leads");
      const data = await res.json();
      setLeads(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error("Error loading B2B leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter === "ALL") return true;
    return lead.status === statusFilter;
  });

  return (
    <div className="bg-slate-50 flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:h-full max-xl:flex-col min-h-screen">
      <DashboardSidebar />

      <main className="flex flex-col gap-y-6 xl:ml-5 max-xl:px-5 w-full py-8 pr-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-indigo-900 text-white rounded-lg">
                <FaIndustry className="text-amber-400 text-xl" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Apparel Emporium B2B Leads
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct factory inquiries, RFQs, and sample orders submitted by international apparel buyers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 transition"
            >
              <FaRotate className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Leads</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{leads.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Review</span>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {leads.filter((l) => l.status === "PENDING").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Sample Requests</span>
            <p className="text-2xl font-black text-indigo-600 mt-1">
              {leads.filter((l) => l.sampleNeeded).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Total Unit Demand</span>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {leads.reduce((sum, l) => sum + (l.targetQuantity || 0), 0).toLocaleString()} pcs
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
            <FaFilter /> Status Filter:
          </span>
          {["ALL", "PENDING", "CONTACTED", "QUOTED", "CLOSED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition ${
                statusFilter === st
                  ? "bg-indigo-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          {loading ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              <FaRotate className="animate-spin text-2xl mx-auto mb-2 text-indigo-600" />
              Loading inquiries...
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No inquiries found for this status filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Company & Buyer</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4">Target Qty / Price</th>
                    <th className="py-3 px-4">Specifications</th>
                    <th className="py-3 px-4">Sample?</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{lead.companyName}</div>
                        <div className="text-[11px] text-slate-500">{lead.contactPerson}</div>
                        {lead.product && (
                          <div className="mt-1 text-[10px] text-indigo-700 font-medium">
                            Product: {lead.product.title}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 space-y-1">
                        <div className="flex items-center gap-1 text-slate-700">
                          <FaEnvelope className="text-[10px] text-slate-400" />
                          <a href={`mailto:${lead.email}`} className="hover:underline">
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-slate-600">
                          <FaPhone className="text-[10px] text-slate-400" />
                          <span>{lead.phone}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-1 font-medium text-slate-800">
                          <FaGlobe className="text-[10px] text-slate-400" />
                          {lead.country}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{lead.targetQuantity.toLocaleString()} pcs</div>
                        {lead.targetPrice && (
                          <div className="text-[11px] text-slate-500">Target: {lead.targetPrice}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        {lead.fabricPreference && (
                          <div className="font-semibold text-indigo-900 text-[11px] mb-0.5">
                            {lead.fabricPreference}
                          </div>
                        )}
                        <p className="line-clamp-2 text-slate-600 text-[11px] leading-tight">
                          {lead.specifications}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        {lead.sampleNeeded ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            Required
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">No</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold ${
                            lead.status === "PENDING"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : lead.status === "CONTACTED"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : lead.status === "QUOTED"
                              ? "bg-indigo-100 text-indigo-800 border border-indigo-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

