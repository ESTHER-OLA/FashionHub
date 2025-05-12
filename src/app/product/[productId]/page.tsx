"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById, getSimilarProducts } from "@/data/products";
import { Product } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const router = useRouter();
  const params = useParams<{ productId: string }>();
  const productId = params?.productId;
  const { addItem: addToCart } = useCart();
  const {
    addItem: addToWishlist,
    isInWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!productId) {
      router.push("/");
      return;
    }

    setIsLoading(true);

    // Simulate API fetch delay
    setTimeout(() => {
      const foundProduct = getProductById(productId as string);

      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0] || "");
        setSelectedSize(foundProduct.sizes[0] || "");
        setSimilarProducts(getSimilarProducts(foundProduct));
      } else {
        router.push("/not-found");
      }

      setIsLoading(false);
    }, 500);
  }, [productId, router]);

  const handleAddToCart = () => {
    if (!product) return;

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to cart");
      router.push(`/login?from=/product/${productId}`);
      return;
    }

    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart(product, quantity!);
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    if (!isAuthenticated) {
      toast.error("Please sign in to add items to wishlist");
      router.push(`/login?from=/product/${productId}`);
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) return;
    setQuantity(newQuantity || 1);
  };

  const handlePrevImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-20 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl">Product not found</h1>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-fashion-secondary mb-6">
        <span>Home</span> / <span>Shop</span> / <span>{product.category}</span>{" "}
        / <span className="text-fashion-primary">{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square overflow-hidden rounded-lg mb-4 relative bg-gray-100">
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              width={96} // Adjust width and height as needed
              height={96} // Adjust width and height as needed
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>
              </>
            )}

            {/* Sale Badge */}
            {product.isSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded">
                SALE
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 rounded-md overflow-hidden ${
                    currentImageIndex === index
                      ? "ring-2 ring-fashion-primary"
                      : "opacity-70"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    width={96} // Adjust width and height as needed
                    height={96} // Adjust width and height as needed
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-fashion-primary mb-2">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center mb-4">
            {product.originalPrice ? (
              <>
                <span className="text-xl font-bold text-red-500 mr-2">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-fashion-secondary line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-fashion-primary">
                ${product.price.toFixed(2)}
              </span>
            )}

            {/* Rating */}
            {product.rating !== undefined && (
              <div className="ml-auto flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={
                        i < Math.floor(product.rating || 0)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-fashion-secondary">
                  ({product.reviews} reviews)
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-fashion-secondary mb-6">{product.description}</p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-fashion-secondary">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">
              Color:{" "}
              <span className="text-fashion-secondary">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color
                      ? "ring-2 ring-fashion-primary ring-offset-2"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">
              Size:{" "}
              <span className="text-fashion-secondary">{selectedSize}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 border rounded-md flex items-center justify-center transition-all ${
                    selectedSize === size
                      ? "bg-fashion-primary text-white border-fashion-primary"
                      : "bg-white text-fashion-primary border-gray-300 hover:border-fashion-primary"
                  }`}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <div className="px-6 py-2 border-l border-r flex items-center justify-center min-w-[60px]">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>

            <Button
              className="flex-1 md:flex-none bg-fashion-primary hover:bg-fashion-primary/90 gap-2"
              size="lg"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={18} />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={isWishlisted ? "text-red-500 border-red-500" : ""}
              onClick={handleToggleWishlist}
            >
              <Heart className={isWishlisted ? "fill-red-500" : ""} />
            </Button>
          </div>

          {/* Stock Status */}
          <div
            className={`text-sm ${
              product.inStock ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
