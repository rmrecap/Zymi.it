"use client";
import { DashboardSidebar } from "@/components";
import apiClient from "@/lib/api";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import { sanitizeFormData } from "@/lib/form-sanitize";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    merchantId?: string;
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
    productType: "B2B_GARMENT" | "DROPSHIP" | "AFFILIATE_AMAZON" | "DIGITAL_DOWNLOAD";
    moq?: number;
    leadTime?: string;
    fabricDetails?: string;
    customizationOptions?: string;
    asin?: string;
    affiliateUrl?: string;
    downloadUrl?: string;
    fileSize?: string;
    digitalFormat?: string;
  }>({
    merchantId: "",
    title: "",
    price: 0,
    manufacturer: "Apparel Emporium",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
    productType: "B2B_GARMENT",
    moq: 500,
    leadTime: "45-60 days",
    fabricDetails: "",
    customizationOptions: "",
    asin: "",
    affiliateUrl: "",
    downloadUrl: "",
    fileSize: "",
    digitalFormat: "ZIP (AI + PDF + DXF)",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const addProduct = async () => {
    if (
      !product.merchantId ||
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === ""
    ) {
      toast.error("Please enter values in required fields");
      return;
    }

    try {
      // Sanitize form data before sending to API
      const sanitizedProduct = sanitizeFormData(product);

      console.log("Sending product data:", sanitizedProduct);

      // Correct usage of apiClient.post
      const response = await apiClient.post(`/api/products`, sanitizedProduct);

      if (response.status === 201) {
        const data = await response.json();
        console.log("Product created successfully:", data);
        toast.success("Product added successfully");
        setProduct({
          merchantId: merchants[0]?.id || "",
          title: "",
          price: 0,
          manufacturer: "Apparel Emporium",
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: categories[0]?.id || "",
          productType: "B2B_GARMENT",
          moq: 500,
          leadTime: "45-60 days",
          fabricDetails: "",
          customizationOptions: "",
          asin: "",
          affiliateUrl: "",
          downloadUrl: "",
          fileSize: "",
          digitalFormat: "ZIP (AI + PDF + DXF)",
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to create product:", errorData);
        toast.error(`Error: ${errorData.message || "Failed to add product"}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Network error. Please try again.");
    }
  };

  const fetchMerchants = async () => {
    try {
      const res = await apiClient.get("/api/merchants");
      const data: Merchant[] = await res.json();
      setMerchants(data || []);
      setProduct((prev) => ({
      ...prev,
        merchantId: prev.merchantId || data?.[0]?.id || "",
      }));
    } catch (e) {
      toast.error("Failed to load merchants");
    }
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await apiClient.post("/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("File upload unsuccessfull");
      }
    } catch (error) {
      console.error("Error happend while sending request:", error);
    }
  };

  const fetchCategories = async () => {
    apiClient
      .get(`/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setProduct((prev) => ({
          ...prev,
          categoryId: data[0]?.id || "",
        }));
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchMerchants();
  }, []);

  return (
    <div className="bg-white flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Add new product</h1>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Merchant Info:</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.merchantId}
              onChange={(e) =>
                setProduct({ ...product, merchantId: e.target.value })
              }
            >
              {merchants.map((merchant) => (
                <option key={merchant.id} value={merchant.id}>
                  {merchant.name}
                </option>
              ))}
            </select>
            {merchants.length === 0 && (
              <span className="text-xs text-red-500 mt-1">
                Please create a merchant first.
              </span>
            )}
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text font-bold text-slate-800">Product Business Model & Type:</span>
            </div>
            <select
              className="select select-bordered w-full font-medium"
              value={product?.productType}
              onChange={(e: any) =>
                setProduct({ ...product, productType: e.target.value })
              }
            >
              <option value="B2B_GARMENT">Apparel Emporium B2B Garment (OEM/Factory)</option>
              <option value="DROPSHIP">Standard Dropship / Physical E-Commerce</option>
              <option value="AFFILIATE_AMAZON">Amazon Creators / Affiliate Product</option>
              <option value="DIGITAL_DOWNLOAD">Digital Asset / RMG Tech Pack Download</option>
            </select>
          </label>
        </div>

        {/* Dynamic Business Type Fields */}
        {product.productType === "B2B_GARMENT" && (
          <div className="p-4 bg-indigo-50/60 border border-indigo-200 rounded-xl space-y-4 max-w-xl">
            <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wide">
              Apparel Emporium B2B Manufacturing Specs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">Minimum Order Quantity (MOQ):</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.moq || 500}
                  onChange={(e) => setProduct({ ...product, moq: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">Lead Time:</label>
                <input
                  type="text"
                  placeholder="e.g. 45-60 days"
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.leadTime || ""}
                  onChange={(e) => setProduct({ ...product, leadTime: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="label-text text-xs font-semibold text-slate-700">Fabric Details & GSM:</label>
              <input
                type="text"
                placeholder="e.g. 100% Combed Cotton Single Jersey 180 GSM"
                className="input input-bordered input-sm w-full mt-1"
                value={product.fabricDetails || ""}
                onChange={(e) => setProduct({ ...product, fabricDetails: e.target.value })}
              />
            </div>
            <div>
              <label className="label-text text-xs font-semibold text-slate-700">Customization / Private Label Options:</label>
              <input
                type="text"
                placeholder="e.g. Screen print, embroidery, custom trims, neck tags"
                className="input input-bordered input-sm w-full mt-1"
                value={product.customizationOptions || ""}
                onChange={(e) => setProduct({ ...product, customizationOptions: e.target.value })}
              />
            </div>
          </div>
        )}

        {product.productType === "AFFILIATE_AMAZON" && (
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-4 max-w-xl">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wide">
              Amazon Creators & Affiliate Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">Amazon ASIN:</label>
                <input
                  type="text"
                  placeholder="e.g. B002KCK92I"
                  className="input input-bordered input-sm w-full mt-1 font-mono uppercase"
                  value={product.asin || ""}
                  onChange={(e) => setProduct({ ...product, asin: e.target.value.trim().toUpperCase() })}
                />
              </div>
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">Affiliate Link / Tag:</label>
                <input
                  type="text"
                  placeholder="https://www.amazon.com/dp/..."
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.affiliateUrl || ""}
                  onChange={(e) => setProduct({ ...product, affiliateUrl: e.target.value })}
                />
              </div>
            </div>
            <p className="text-xs text-amber-800">
              Note: When ASIN is provided, the product will automatically support geo-targeted redirection to amazon.com, amazon.co.uk, amazon.ae, etc.
            </p>
          </div>
        )}

        {product.productType === "DIGITAL_DOWNLOAD" && (
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-4 max-w-xl">
            <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">
              Digital RMG Tech Pack & Asset Delivery
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">File Format:</label>
                <input
                  type="text"
                  placeholder="e.g. ZIP (AI + PDF + DXF)"
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.digitalFormat || ""}
                  onChange={(e) => setProduct({ ...product, digitalFormat: e.target.value })}
                />
              </div>
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">File Size:</label>
                <input
                  type="text"
                  placeholder="e.g. 18.5 MB"
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.fileSize || ""}
                  onChange={(e) => setProduct({ ...product, fileSize: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="label-text text-xs font-semibold text-slate-700">Secure Download URL:</label>
              <input
                type="text"
                placeholder="https://... or /downloads/sample-techpack.zip"
                className="input input-bordered input-sm w-full mt-1"
                value={product.downloadUrl || ""}
                onChange={(e) => setProduct({ ...product, downloadUrl: e.target.value })}
              />
            </div>
          </div>
        )}

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product name:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.title}
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product slug:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={convertSlugToURLFriendly(product?.slug)}
              onChange={(e) =>
                setProduct({
                  ...product,
                  slug: convertSlugToURLFriendly(e.target.value),
                })
              }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category:</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.categoryId}
              onChange={(e) =>
                setProduct({ ...product, categoryId: e.target.value })
              }
            >
              {categories &&
                categories.map((category: any) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product price:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.price}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Manufacturer:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.manufacturer}
              onChange={(e) =>
                setProduct({ ...product, manufacturer: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Is product in stock?</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.inStock}
              onChange={(e) =>
                setProduct({ ...product, inStock: Number(e.target.value) })
              }
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
        </div>
        <div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-lg w-full max-w-sm"
            onChange={(e: any) => {
              uploadFile(e.target.files[0]);
              setProduct({ ...product, mainImage: e.target.files[0].name });
            }}
          />
          {product?.mainImage && (
            <Image
              src={`/` + product?.mainImage}
              alt={product?.title}
              className="w-auto h-auto"
              width={100}
              height={100}
            />
          )}
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Product description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              value={product?.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            ></textarea>
          </label>
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={addProduct}
            type="button"
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
          >
            Add product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
