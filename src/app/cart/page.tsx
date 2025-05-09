"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trash, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const CartPage = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    shipping,
    total,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout");
      return;
    }

    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-fashion-secondary mb-8">
            You haven&apos;t added any products to your cart yet.
          </p>
          <Link href="/">
            <Button className="bg-fashion-primary hover:bg-fashion-primary/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {/* Header */}
          <div className="hidden md:grid grid-cols-8 gap-4 border-b pb-3 text-sm text-fashion-secondary">
            <div className="col-span-4">Product</div>
            <div className="col-span-1 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-1 text-right">Subtotal</div>
          </div>

          {/* Cart Items */}
          <div className="space-y-4 mt-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="grid grid-cols-1 md:grid-cols-8 gap-4 border-b pb-4"
              >
                {/* Product Info */}
                <div className="col-span-1 md:col-span-4 flex gap-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={96} // Adjust width and height as needed
                      height={96} // Adjust width and height as needed
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="hover:text-fashion-accent"
                      >
                        {item.product.name}
                      </Link>
                    </h3>
                    <div className="text-sm text-fashion-secondary mt-1">
                      Category: {item.product.category}
                    </div>

                    {/* Mobile: Price & Remove (only visible on mobile) */}
                    <div className="flex justify-between items-center mt-2 md:hidden">
                      <div className="font-semibold">
                        ${item.product.price.toFixed(2)}
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden md:flex col-span-1 items-center justify-center">
                  <div className="font-medium">
                    ${item.product.price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity */}
                <div className="col-span-1 md:col-span-2 flex items-center justify-center">
                  <div className="flex border rounded overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="px-4 py-1 border-l border-r flex items-center justify-center min-w-[40px]">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Subtotal & Remove */}
                <div className="col-span-1 flex md:justify-between items-center">
                  <div className="font-semibold hidden md:block">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Desktop: Remove button (only visible on desktop) */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hidden md:block"
                    aria-label="Remove item"
                  >
                    <Trash size={18} />
                  </button>

                  {/* Mobile: Subtotal (only visible on mobile) */}
                  <div className="font-semibold md:hidden">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Actions */}
          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>

            <Button
              variant="outline"
              onClick={clearCart}
              className="text-red-500 border-red-500 hover:bg-red-50"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-fashion-secondary">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-fashion-secondary">Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>

              <div className="border-t pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
              size="lg"
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout
            </Button>

            <div className="mt-4 text-xs text-fashion-secondary text-center">
              Shipping & taxes calculated at checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
