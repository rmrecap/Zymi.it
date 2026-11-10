"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa6";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import toast from "react-hot-toast";

interface WishItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
}

export default function WishItem({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: WishItemProps) {
  const { removeFromWishlist } = useWishlistStore();

  const handleRemove = () => {
    removeFromWishlist(id);
    toast.success("Item removed from wishlist");
  };

  return (
    <tr className="border-b border-gray-100 hover:bg-slate-50 transition">
      <td>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-rose-500 transition p-2"
          title="Remove item"
        >
          <FaTrash className="text-sm" />
        </button>
      </td>
      <td>
        <div className="flex justify-center">
          <Link href={`/product/${slug}`}>
            <Image
              src={image ? (image.startsWith("http") ? image : `/${image}`) : "/product_placeholder.jpg"}
              alt={title || "Wishlist item"}
              width={64}
              height={64}
              className="object-contain w-16 h-16 rounded-lg bg-gray-50 p-1"
            />
          </Link>
        </div>
      </td>
      <td className="font-semibold text-slate-800 text-sm">
        <Link href={`/product/${slug}`} className="hover:text-indigo-600 transition">
          {title}
        </Link>
        <p className="text-xs text-slate-500 mt-0.5">${price}</p>
      </td>
      <td>
        {stockAvailabillity > 0 ? (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            In Stock
          </span>
        ) : (
          <span className="text-xs font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
            Out of Stock
          </span>
        )}
      </td>
      <td>
        <Link
          href={`/product/${slug}`}
          className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
        >
          View Product
        </Link>
      </td>
    </tr>
  );
}

