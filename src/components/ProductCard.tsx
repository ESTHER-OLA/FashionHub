"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  size?: "default" | "small";
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  size = "default",
}) => {
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to wishlist");
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <Link
      href={`/product/${product.id}`}
      className={`product-card block relative group hover-scale ${
        size === "small" ? "h-64" : "h-96"
      }`}
    >
      {/* Product Image */}
      <div
        className={`relative overflow-hidden ${
          size === "small" ? "h-40" : "h-72"
        }`}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400} 
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.isSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            SALE
          </div>
        )}

        {product.isNew && (
          <div className="absolute top-2 right-2 bg-fashion-accent text-white text-xs px-2 py-1 rounded">
            NEW
          </div>
        )}

        {/* Product Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-2 px-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <Button
            variant="default"
            size="sm"
            className="w-full bg-fashion-primary hover:bg-fashion-primary/90"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>

        {/* Wishlist Icon */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={isWishlisted ? "fill-red-500 stroke-red-500" : ""}
            size={16}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3
          className={`font-medium text-fashion-primary ${
            size === "small" ? "text-sm" : "text-base"
          } line-clamp-1`}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            {product.originalPrice ? (
              <>
                <span className="text-red-500 font-semibold mr-2">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-fashion-primary font-semibold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {product.rating && (
            <div
              className={`text-amber-500 ${
                size === "small" ? "text-xs" : "text-sm"
              }`}
            >
              ★ {product.rating}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
