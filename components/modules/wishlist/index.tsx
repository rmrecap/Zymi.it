"use client";

import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import WishItem from "@/components/WishItem";
import apiClient from "@/lib/api";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Link from "next/link";
import { FaHeart, FaBagShopping } from "react-icons/fa6";

export const WishlistModule = () => {
  const { data: session } = useSession();
  const { wishlist, setWishlist } = useWishlistStore();

  const getWishlistByUserId = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/wishlist/${id}`, {
        cache: "no-store",
      });
      const wishlistData = await response.json();

      const productArray: {
        id: string;
        title: string;
        price: number;
        image: string;
        slug: string;
        stockAvailabillity: number;
      }[] = [];

      if (Array.isArray(wishlistData)) {
        wishlistData.forEach((item: any) =>
          productArray.push({
            id: item?.product?.id,
            title: item?.product?.title,
            price: item?.product?.price,
            image: item?.product?.mainImage,
            slug: item?.product?.slug,
            stockAvailabillity: item?.product?.inStock,
          })
        );
        setWishlist(productArray);
      }
    } catch {
      // Graceful fallback if offline or guest session
    }
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      try {
        const response = await apiClient.get(
          `/api/users/email/${session?.user?.email}`,
          { cache: "no-store" }
        );
        const data = await response.json();
        if (data?.id) {
          getWishlistByUserId(data.id);
        }
      } catch {
        // Fallback for guest
      }
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <>
      {wishlist && wishlist.length === 0 ? (
        <div className="text-center py-16 px-4 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center text-2xl shadow-inner">
            <FaHeart />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
            Explore our curated collections of B2B garment samples, digital tech packs, and commercial equipment. Tap the heart icon on any item to save it for later.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md transition"
            >
              <FaBagShopping /> Discover Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-2 text-center w-12">Action</th>
                <th className="py-3 px-4 text-center w-24">Item</th>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {wishlist &&
                wishlist.map((item) => (
                  <WishItem
                    id={item?.id}
                    title={item?.title}
                    price={item?.price}
                    image={item?.image}
                    slug={item?.slug}
                    stockAvailabillity={item?.stockAvailabillity}
                    key={nanoid()}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
