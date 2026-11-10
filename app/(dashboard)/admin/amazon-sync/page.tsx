"use client";

import React, { useState } from "react";
import { DashboardSidebar } from "@/components";
import { FaAmazon, FaRotate, FaCheck, FaTriangleExclamation, FaGlobe, FaBolt, FaArrowUpRightFromSquare } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function AdminAmazonSyncPage() {
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<any>(null);
  const [testAsin, setTestAsin] = useState<string>("B08N5WRWNW");
  const [testCountry, setTestCountry] = useState<string>("US");

  const runManualSync = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      const res = await fetch("/api/cron/sync-amazon", {
        headers: {
          authorization: `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || "zymi-amazon-cron-secret-2026"}`,
        },
      });

      const data = await res.json();
      setSyncResult(data);

      if (res.ok) {
        toast.success(`Amazon sync finished: ${data.syncedCount || 0} products updated`);
      } else {
        toast.error(data.error || "Sync failed");
      }
    } catch (err: any) {
      toast.error("Network error running Amazon sync");
    } finally {
      setSyncing(false);
    }
  };

  const testRedirectUrl = `/api/affiliate/redirect?asin=${encodeURIComponent(testAsin)}&country=${testCountry}`;

  return (
    <div className="bg-slate-50 flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:h-full max-xl:flex-col min-h-screen">
      <DashboardSidebar />

      <main className="flex flex-col gap-y-6 xl:ml-5 max-xl:px-5 w-full py-8 pr-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[#FF9900] text-slate-950 rounded-lg">
                <FaAmazon className="text-xl" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Amazon Creators API & Sync Manager
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Automated high-ticket apparel & textile equipment catalog synchronizer with OAuth 2.0 and Upstash caching.
            </p>
          </div>

          <button
            onClick={runManualSync}
            disabled={syncing}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FF9900] hover:bg-[#FF8800] text-slate-950 font-bold rounded-lg shadow-sm transition active:scale-98 disabled:opacity-50 text-sm"
          >
            <FaRotate className={syncing ? "animate-spin" : ""} />
            <span>{syncing ? "Syncing Catalog..." : "Run Instant Sync Now"}</span>
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">API Protocol</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <p className="font-bold text-slate-900 text-sm">OAuth 2.0 / Login with Amazon</p>
            </div>
            <p className="text-xs text-slate-500">
              Cached in Upstash Context7 for 55 minutes to minimize auth overhead.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Monthly Commission</span>
            <p className="text-2xl font-black text-emerald-600">$10,000 / month</p>
            <p className="text-xs text-slate-500">
              High-ticket items: Commercial embroidery machines ($3,500+), Fabric GSM cutters ($280+), Spectrophotometers ($1,200+).
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Geo-Targeted Routing</span>
            <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-semibold">
              <FaGlobe />
              <span>US, UK, UAE (amazon.ae), CA, DE, AU</span>
            </div>
            <p className="text-xs text-slate-500">
              Smart IP headers redirect buyers to their local Amazon marketplace preserving tracking cookies.
            </p>
          </div>
        </div>

        {/* Sync Result Output */}
        {syncResult && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">Last Sync Execution Output:</h3>
              <span className="text-xs font-medium text-slate-500">{new Date().toLocaleTimeString()}</span>
            </div>
            <pre className="p-4 bg-slate-900 text-emerald-400 rounded-lg text-xs font-mono overflow-x-auto">
              {JSON.stringify(syncResult, null, 2)}
            </pre>
          </div>
        )}

        {/* Geo-Redirection Live Tester */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <FaBolt className="text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">Live Affiliate Geo-Redirection Tester</h3>
          </div>
          <p className="text-xs text-slate-600">
            Simulate a buyer clicking an affiliate link from different global regions to verify the redirect URL and partner tag:
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">ASIN:</label>
              <input
                type="text"
                value={testAsin}
                onChange={(e) => setTestAsin(e.target.value)}
                className="input input-bordered input-sm font-mono uppercase"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Simulated Country:</label>
              <select
                value={testCountry}
                onChange={(e) => setTestCountry(e.target.value)}
                className="select select-bordered select-sm"
              >
                <option value="US">United States (amazon.com)</option>
                <option value="GB">United Kingdom (amazon.co.uk)</option>
                <option value="AE">United Arab Emirates (amazon.ae)</option>
                <option value="CA">Canada (amazon.ca)</option>
                <option value="DE">Germany (amazon.de)</option>
                <option value="AU">Australia (amazon.com.au)</option>
              </select>
            </div>

            <div className="pt-5">
              <a
                href={testRedirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold rounded-lg transition"
              >
                <span>Test Live Redirect</span>
                <FaArrowUpRightFromSquare className="text-[10px]" />
              </a>
            </div>
          </div>
        </div>

        {/* High-Ticket Equipment ASIN Reference */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Synchronized High-Ticket RMG Machinery ASINs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-100 font-bold text-slate-800">
                <tr>
                  <th className="py-2.5 px-4">ASIN</th>
                  <th className="py-2.5 px-4">Machine / Equipment Model</th>
                  <th className="py-2.5 px-4">Est. Retail Price</th>
                  <th className="py-2.5 px-4">Commission Tier</th>
                  <th className="py-2.5 px-4">Target Audience</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">B08N5WRWNW</td>
                  <td className="font-sans font-medium text-slate-900">Commercial 15-Needle Embroidery Machine</td>
                  <td className="text-emerald-700 font-bold">$3,899.00</td>
                  <td className="text-slate-600">4% ($155.96/sale)</td>
                  <td className="font-sans text-slate-600">B2B Factories & Fashion Studios</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">B01M3W08HQ</td>
                  <td className="font-sans font-medium text-slate-900">JUKI DDL-8700 Industrial High-Speed Lockstitch</td>
                  <td className="text-emerald-700 font-bold">$849.00</td>
                  <td className="text-slate-600">4% ($33.96/sale)</td>
                  <td className="font-sans text-slate-600">Apparel Workshops & Tailors</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">B002KCK92I</td>
                  <td className="font-sans font-medium text-slate-900">Textile Digital Fabric GSM Circular Cutter & Balance</td>
                  <td className="text-emerald-700 font-bold">$289.00</td>
                  <td className="text-slate-600">4% ($11.56/sale)</td>
                  <td className="font-sans text-slate-600">QA Lab Technicians & Merchandisers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-indigo-700">B07V4995X7</td>
                  <td className="font-sans font-medium text-slate-900">Professional Rotary Fabric Cutting Machine (Octagonal)</td>
                  <td className="text-emerald-700 font-bold">$169.00</td>
                  <td className="text-slate-600">4% ($6.76/sale)</td>
                  <td className="font-sans text-slate-600">Sample Rooms & Cutting Masters</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

