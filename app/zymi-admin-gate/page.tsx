"use client";

import React, { useState, useEffect, Suspense } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  FaShieldHalved,
  FaLock,
  FaKey,
  FaArrowRight,
  FaCircleCheck,
  FaTriangleExclamation,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import toast from "react-hot-toast";

const DEFAULT_SECRET_GATE_KEY = "zymi2026admin";

function AdminGateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  // Step 1: Gate Key Verification
  const [gateKeyInput, setGateKeyInput] = useState("");
  const [isGateUnlocked, setIsGateUnlocked] = useState(false);
  const [showGateKeyPrompt, setShowGateKeyPrompt] = useState(false);

  // Step 2: Admin Login Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check URL key on initial load
  useEffect(() => {
    const urlKey = searchParams.get("key");
    if (urlKey && urlKey.trim().toLowerCase() === DEFAULT_SECRET_GATE_KEY.toLowerCase()) {
      setIsGateUnlocked(true);
    }
  }, [searchParams]);

  // If already logged in as admin, redirect to /admin directly
  useEffect(() => {
    if (status === "authenticated" && (session?.user as any)?.role === "admin") {
      router.push("/admin");
    }
  }, [status, session, router]);

  const handleUnlockGate = (e: React.FormEvent) => {
    e.preventDefault();
    if (gateKeyInput.trim().toLowerCase() === DEFAULT_SECRET_GATE_KEY.toLowerCase()) {
      setIsGateUnlocked(true);
      setErrorMessage("");
      toast.success("Security Shield Unlocked");
    } else {
      setErrorMessage("Invalid Security Gate Key. Access Denied.");
      toast.error("Access Denied");
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.trim(),
        password: password,
      });

      if (res?.error) {
        setErrorMessage("Invalid Admin credentials. Check your email and password.");
        toast.error("Authentication failed");
        setIsLoading(false);
        return;
      }

      toast.success("Admin authorized! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 700);
    } catch {
      setErrorMessage("Network error during admin authentication");
      toast.error("Network error");
      setIsLoading(false);
    }
  };

  // If gate is locked and prompt is not open, show stealth camouflage view
  if (!isGateUnlocked && !showGateKeyPrompt) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-md w-full text-center space-y-4 z-10">
          <div className="inline-flex p-4 rounded-full bg-slate-900 border border-slate-800 text-slate-600 mb-2">
            <FaLock className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-200">
            404 - Resource Not Found
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The requested internal destination does not exist or requires authorized operational clearance.
          </p>

          <div className="pt-4 flex items-center justify-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            >
              Return to Storefront
            </Link>

            {/* Discreet admin key reveal button */}
            <button
              type="button"
              onClick={() => setShowGateKeyPrompt(true)}
              className="text-xs px-3 py-2 rounded-lg text-slate-600 hover:text-cyan-400 hover:bg-slate-900 transition-colors flex items-center gap-1.5"
              title="Operational Clearance Gate"
            >
              <FaShieldHalved className="text-xs" />
              <span>Security Terminal</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If gate key prompt is active but not unlocked yet
  if (!isGateUnlocked) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative">
        <div className="max-w-md w-full bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-1">
              <FaShieldHalved className="text-2xl" />
            </div>
            <h2 className="text-lg font-black tracking-tight text-white uppercase">
              ZYMI Security Shield Gate
            </h2>
            <p className="text-xs text-slate-400">
              Enter your master administrative gate key to access the console.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <FaTriangleExclamation className="text-sm shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleUnlockGate} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Master Gate Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={gateKeyInput}
                  onChange={(e) => setGateKeyInput(e.target.value)}
                  placeholder="Enter security gate key..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
                  autoFocus
                  required
                />
                <FaKey className="absolute right-3.5 top-3.5 text-slate-500 text-xs" />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowGateKeyPrompt(false)}
                className="w-1/3 py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-2/3 py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>Unlock Gate</span>
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </form>

          <p className="text-[10px] text-center text-slate-500">
            Protected by VibeSec Security Protocol • All attempts logged
          </p>
        </div>
      </div>
    );
  }

  // Once Gate is Unlocked: Admin Credentials Console
  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-cyan-500/5 to-transparent pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-700/70 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl relative z-10 space-y-6">
        {/* Gate Status Pill */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Gate Shield Active
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsGateUnlocked(false)}
            className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors"
          >
            Lock Terminal
          </button>
        </div>

        <div className="text-center space-y-1.5">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 mb-2">
            <FaShieldHalved className="text-2xl" />
          </div>
          <h2 className="text-xl font-black tracking-tight text-white">
            ZYMI Command Center
          </h2>
          <p className="text-xs text-slate-400">
            Enter administrator credentials to access management dashboard.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <FaTriangleExclamation className="text-sm shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@zymi.it"
              className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/80 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-colors pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all ${
                isLoading
                  ? "bg-cyan-600/50 cursor-wait"
                  : "bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 hover:brightness-110 active:scale-98 cursor-pointer"
              }`}
            >
              {isLoading ? (
                <span>Authenticating Admin...</span>
              ) : (
                <>
                  <FaCircleCheck className="text-sm" />
                  <span>Authenticate & Enter Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="pt-2 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminGatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500 text-xs">
          Loading Security Gate...
        </div>
      }
    >
      <AdminGateContent />
    </Suspense>
  );
}

