"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBuilding, FaEnvelope, FaGlobe, FaPhone, FaXmark, FaBoxesStacked, FaFileLines } from "react-icons/fa6";
import { Product } from "@/typings";

interface B2BInquiryModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function B2BInquiryModal({ product, isOpen, onClose }: B2BInquiryModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    targetQuantity: product?.moq || 500,
    targetPrice: "",
    fabricPreference: product?.fabricDetails || "",
    specifications: "",
    sampleNeeded: false,
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "targetQuantity") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/b2b-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: product?.id || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit B2B quotation request");
      }

      toast.success("Quotation submitted! Our RMG team will contact you shortly.");
      onClose();
    } catch (err: any) {
      toast.error(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-5 text-white flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-bold text-xs uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Apparel Emporium B2B
              </span>
              <span className="text-xs text-slate-300">RMG Export Hub</span>
            </div>
            <h2 className="text-xl font-bold mt-1 text-white">
              {product ? `Request Quote: ${product.title}` : "Bulk Order & Manufacturing Inquiry"}
            </h2>
            {product?.moq && (
              <p className="text-xs text-amber-300 mt-0.5">
                Minimum Order Quantity (MOQ): {product.moq} pcs
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Close modal"
          >
            <FaXmark className="text-xl" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Company / Brand Name *
              </label>
              <div className="relative">
                <FaBuilding className="absolute left-3 top-3 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="e.g. Apex Apparel Global"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Contact Person *
              </label>
              <input
                type="text"
                name="contactPerson"
                required
                placeholder="Full Name"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Business Email *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400 text-sm" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="buyer@brand.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Phone / WhatsApp *
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Target Country *
              </label>
              <div className="relative">
                <FaGlobe className="absolute left-3 top-3 text-gray-400 text-sm" />
                <input
                  type="text"
                  name="country"
                  required
                  placeholder="e.g. USA, Germany, UK"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Order Quantity (Pcs) *
              </label>
              <div className="relative">
                <FaBoxesStacked className="absolute left-3 top-3 text-gray-400 text-sm" />
                <input
                  type="number"
                  name="targetQuantity"
                  required
                  min={product?.moq || 100}
                  value={formData.targetQuantity}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Target Price / Unit ($)
              </label>
              <input
                type="text"
                name="targetPrice"
                placeholder="e.g. $4.50 - $6.00"
                value={formData.targetPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
              Fabric Preference & GSM
            </label>
            <input
              type="text"
              name="fabricPreference"
              placeholder="e.g. 100% Organic Cotton, 220 GSM French Terry"
              value={formData.fabricPreference}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1">
              Tech Pack / Customization & Specifications *
            </label>
            <div className="relative">
              <FaFileLines className="absolute left-3 top-3 text-gray-400 text-sm" />
              <textarea
                name="specifications"
                required
                rows={3}
                placeholder="Specify size breakdown (S/M/L/XL), custom labels, hangtags, printing/embroidery details..."
                value={formData.specifications}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <input
              type="checkbox"
              id="sampleNeeded"
              name="sampleNeeded"
              checked={formData.sampleNeeded}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="sampleNeeded" className="text-xs font-medium text-indigo-950 cursor-pointer">
              Request Physical Sample (Fit / Pre-Production Sample) prior to bulk execution
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-md hover:shadow-indigo-500/25 transition disabled:opacity-50"
            >
              {loading ? "Submitting Inquiry..." : "Submit B2B RFQ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

