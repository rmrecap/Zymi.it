"use client";
import { CustomButton, DashboardSidebar, SectionTitle } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import {
  convertCategoryNameToURLFriendly as convertSlugToURLFriendly,
  formatCategoryName,
} from "../../../../../utils/categoryFormating";
import { nanoid } from "nanoid";
import apiClient from "@/lib/api";

interface DashboardProductDetailsProps {
  params: Promise<{ id: string }>;
}

const DashboardProductDetails = ({ params }: DashboardProductDetailsProps) => {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [otherImages, setOtherImages] = useState<OtherImages[]>([]);
  const router = useRouter();

  // functionality for deleting product
  const deleteProduct = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    apiClient
      .delete(`/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status !== 204) {
          if (response.status === 400) {
            toast.error(
              "Cannot delete the product because of foreign key constraint"
            );
          } else {
            throw Error("There was an error while deleting product");
          }
        } else {
          toast.success("Product deleted successfully");
          router.push("/admin/products");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting product");
      });
  };

  // functionality for updating product
  const updateProduct = async () => {
    if (
      product?.title === "" ||
      product?.slug === "" ||
      product?.price.toString() === "" ||
      product?.manufacturer === "" ||
      product?.description === ""
    ) {
      toast.error("You need to enter values in input fields");
      return;
    }

    try {
      const response = await apiClient.put(`/api/products/${id}`, product);

      if (response.status === 200) {
        await response.json();
        toast.success("Product successfully updated");
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "There was an error while updating product"
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("There was an error while updating product");
    }
  };

  // functionality for uploading main image file
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
        toast.error("File upload unsuccessful.");
      }
    } catch (error) {
      console.error("There was an error while during request sending:", error);
      toast.error("There was an error during request sending");
    }
  };

  // fetching main product data including other product images
  const fetchProductData = async () => {
    apiClient
      .get(`/api/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      });

    const imagesData = await apiClient.get(`/api/images/${id}`, {
      cache: "no-store",
    });
    const images = await imagesData.json();
    setOtherImages((currentImages) => images);
  };

  // fetching all product categories. It will be used for displaying categories in select category input
  const fetchCategories = async () => {
    apiClient
      .get(`/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 w-full max-xl:px-5">
        <h1 className="text-3xl font-semibold">Product details</h1>
        {/* Product name input div - start */}
        
        <div>
          <label className="form-control w-full max-w-md">
            <div className="label">
              <span className="label-text font-bold text-slate-800">Product Business Model & Type:</span>
            </div>
            <select
              className="select select-bordered w-full font-medium"
              value={product?.productType || "DROPSHIP"}
              onChange={(e: any) =>
                setProduct({ ...product!, productType: e.target.value })
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
        {product?.productType === "B2B_GARMENT" && (
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
                  onChange={(e) => setProduct({ ...product!, moq: Number(e.target.value) })}
                />
              </div>
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">Lead Time:</label>
                <input
                  type="text"
                  placeholder="e.g. 45-60 days"
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.leadTime || ""}
                  onChange={(e) => setProduct({ ...product!, leadTime: e.target.value })}
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
                onChange={(e) => setProduct({ ...product!, fabricDetails: e.target.value })}
              />
            </div>
            <div>
              <label className="label-text text-xs font-semibold text-slate-700">Customization / Private Label Options:</label>
              <input
                type="text"
                placeholder="e.g. Screen print, embroidery, custom trims, neck tags"
                className="input input-bordered input-sm w-full mt-1"
                value={product.customizationOptions || ""}
                onChange={(e) => setProduct({ ...product!, customizationOptions: e.target.value })}
              />
            </div>
          </div>
        )}

        {product?.productType === "AFFILIATE_AMAZON" && (
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
                  onChange={(e) => setProduct({ ...product!, asin: e.target.value.trim().toUpperCase() })}
                />
              </div>
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">Affiliate Link / Tag:</label>
                <input
                  type="text"
                  placeholder="https://www.amazon.com/dp/..."
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.affiliateUrl || ""}
                  onChange={(e) => setProduct({ ...product!, affiliateUrl: e.target.value })}
                />
              </div>
            </div>
            <p className="text-xs text-amber-800">
              Note: When ASIN is provided, the product will automatically support geo-targeted redirection to amazon.com, amazon.co.uk, amazon.ae, etc.
            </p>
          </div>
        )}

        {product?.productType === "DIGITAL_DOWNLOAD" && (
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
                  onChange={(e) => setProduct({ ...product!, digitalFormat: e.target.value })}
                />
              </div>
              <div>
                <label className="label-text text-xs font-semibold text-slate-700">File Size:</label>
                <input
                  type="text"
                  placeholder="e.g. 18.5 MB"
                  className="input input-bordered input-sm w-full mt-1"
                  value={product.fileSize || ""}
                  onChange={(e) => setProduct({ ...product!, fileSize: e.target.value })}
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
                onChange={(e) => setProduct({ ...product!, downloadUrl: e.target.value })}
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
              value={product?.title || ""}
              onChange={(e) =>
                setProduct({ ...product!, title: e.target.value })
              }
            />
          </label>
        </div>
        {/* Product name input div - end */}
        {/* Product price input div - start */}

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product price:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.price || ""}
              onChange={(e) =>
                setProduct({ ...product!, price: Number(e.target.value) })
              }
            />
          </label>
        </div>
        {/* Product price input div - end */}
        {/* Product manufacturer input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Manufacturer:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={product?.manufacturer || ""}
              onChange={(e) =>
                setProduct({ ...product!, manufacturer: e.target.value })
              }
            />
          </label>
        </div>
        {/* Product manufacturer input div - end */}
        {/* Product slug input div - start */}

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Slug:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={
                product?.slug ? convertSlugToURLFriendly(product?.slug) : ""
              }
              onChange={(e) =>
                setProduct({
                  ...product!,
                  slug: convertSlugToURLFriendly(e.target.value),
                })
              }
            />
          </label>
        </div>
        {/* Product slug input div - end */}
        {/* Product inStock select input div - start */}

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Is product in stock?</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.inStock ?? 1}
              onChange={(e) => {
                setProduct({ ...product!, inStock: Number(e.target.value) });
              }}
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
        </div>
        {/* Product inStock select input div - end */}
        {/* Product category select input div - start */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category:</span>
            </div>
            <select
              className="select select-bordered"
              value={product?.categoryId || ""}
              onChange={(e) =>
                setProduct({
                  ...product!,
                  categoryId: e.target.value,
                })
              }
            >
              {categories &&
                categories.map((category: Category) => (
                  <option key={category?.id} value={category?.id}>
                    {formatCategoryName(category?.name)}
                  </option>
                ))}
            </select>
          </label>
        </div>
        {/* Product category select input div - end */}

        {/* Main image file upload div - start */}
        <div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-lg w-full max-w-sm"
            onChange={(e) => {
              // @ts-ignore
              const selectedFile = e.target.files[0];

              if (selectedFile) {
                uploadFile(selectedFile);
                setProduct({ ...product!, mainImage: selectedFile.name });
              }
            }}
          />
          {product?.mainImage && (
            <Image
              src={`/` + product?.mainImage}
              alt={product?.title}
              className="w-auto h-auto mt-2"
              width={100}
              height={100}
            />
          )}
        </div>
        {/* Main image file upload div - end */}
        {/* Other images file upload div - start */}
        <div className="flex gap-x-1">
          {otherImages &&
            otherImages.map((image) => (
              <Image
                src={`/${image.image}`}
                key={nanoid()}
                alt="product image"
                width={100}
                height={100}
                className="w-auto h-auto"
              />
            ))}
        </div>
        {/* Other images file upload div - end */}
        {/* Product description div - start */}
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Product description:</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              value={product?.description || ""}
              onChange={(e) =>
                setProduct({ ...product!, description: e.target.value })
              }
            ></textarea>
          </label>
        </div>
        {/* Product description div - end */}
        {/* Action buttons div - start */}
        <div className="flex gap-x-2 max-sm:flex-col">
          <button
            type="button"
            onClick={updateProduct}
            className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
          >
            Update product
          </button>
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
            onClick={deleteProduct}
          >
            Delete product
          </button>
        </div>
        {/* Action buttons div - end */}
        <p className="text-xl max-sm:text-lg text-error">
          To delete the product you first need to delete all its records in
          orders (customer_order_product table).
        </p>
      </div>
    </div>
  );
};

export default DashboardProductDetails;
