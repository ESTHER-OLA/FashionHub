"use client";
import React from "react";
import Link from "next/link";
import { Heart, Trash, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Heart size={64} className="mx-auto mb-4 text-gray-300" />
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-fashion-secondary mb-8">
            You haven&apos;t added any products to your wishlist yet.
          </p>
          <Link href="/">
            <Button className="bg-fashion-primary hover:bg-fashion-primary/90">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {/* Wishlist Actions */}
      <div className="flex justify-end mb-6">
        <Button
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-50"
          onClick={clearWishlist}
        >
          <Trash size={16} className="mr-2" />
          Clear Wishlist
        </Button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow"
          >
            {/* Product Image */}
            <Link
              href={`/product/${product.id}`}
              className="block relative overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={96} // Adjust width and height as needed
                height={96} // Adjust width and height as needed
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              {product.isSale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  SALE
                </div>
              )}
            </Link>

            {/* Product Info */}
            <div className="p-4">
              <Link
                href={`/product/${product.id}`}
                className="hover:text-fashion-accent"
              >
                <h3 className="font-medium mb-1 line-clamp-1">
                  {product.name}
                </h3>
              </Link>

              <div className="flex items-center justify-between mt-2">
                <div>
                  {product.originalPrice ? (
                    <div className="flex items-center">
                      <span className="text-red-500 font-semibold mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => removeItem(product.id)}
                  className="text-red-500 hover:text-red-600"
                  aria-label="Remove from wishlist"
                >
                  <Trash size={18} />
                </button>
              </div>

              <Button
                className="w-full mt-4 bg-fashion-primary hover:bg-fashion-primary/90 flex items-center justify-center gap-2"
                onClick={() => handleAddToCart(product.id)}
              >
                <ShoppingCart size={16} />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
