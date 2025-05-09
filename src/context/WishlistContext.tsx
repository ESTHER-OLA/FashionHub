"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { Product } from "@/types/product";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Product[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("fashionWishlist");
    if (storedWishlist) {
      setItems(JSON.parse(storedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("fashionWishlist", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prevItems) => {
      // Check if item already exists in wishlist
      const exists = prevItems.some((item) => item.id === product.id);

      if (exists) {
        toast.info(`${product.name} is already in your wishlist`);
        return prevItems;
      } else {
        toast.success(`${product.name} added to your wishlist`);
        return [...prevItems, product];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);

      toast.success("Product removed from your wishlist");

      return updatedItems;
    });
  };

  const isInWishlist = (productId: string): boolean => {
    return items.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setItems([]);
    toast.success("All items have been removed from your wishlist");
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
