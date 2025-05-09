"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const shipping = 10; // Fixed shipping cost for demo

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("fashionCart");
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("fashionCart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;

        toast.success(`${product.name} quantity updated in your cart`);

        return updatedItems;
      } else {
        // Add new item
        toast.success(`${product.name} added to your cart`);
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.product.id !== productId
      );

      toast.success("Product removed from your cart");
      return updatedItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });

      return updatedItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.success("All items have been removed from your cart");
  };

  // Calculate derived values
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
