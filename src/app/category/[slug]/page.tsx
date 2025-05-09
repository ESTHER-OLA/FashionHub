"use client";

import React, { useState, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters, {
  FilterState,
} from "@/components/filters/ProductFilters";
import { useSearchParams, useParams } from "next/navigation";
import { getProductsByCategory, products } from "@/data/products";
import { Product } from "@/types/product";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const params = useParams();

  const routeCategory = params?.slug as string;
  const queryCategory = searchParams?.get("category");
  const category = queryCategory || routeCategory;

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Setup filter options
  const categoryFilters = [
    {
      id: "gender",
      name: "Gender",
      options: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "children", label: "Children" },
        { id: "unisex", label: "Unisex" },
      ],
    },
  ];

  const subcategoryFilters = [
    {
      id: "clothing",
      name: "Clothing Type",
      options: [
        { id: "shirts", label: "Shirts" },
        { id: "pants", label: "Pants" },
        { id: "dresses", label: "Dresses" },
        { id: "t-shirts", label: "T-shirts" },
        { id: "sweaters", label: "Sweaters" },
        { id: "suits", label: "Suits" },
        { id: "activewear", label: "Activewear" },
        { id: "baby", label: "Baby" },
      ],
    },
    {
      id: "style",
      name: "Style",
      options: [
        { id: "casual", label: "Casual" },
        { id: "formal", label: "Formal" },
        { id: "sports", label: "Sports" },
        { id: "corporate", label: "Corporate" },
      ],
    },
  ];

  const colorOptions = [
    { id: "red", label: "Red" },
    { id: "blue", label: "Blue" },
    { id: "green", label: "Green" },
    { id: "black", label: "Black" },
    { id: "white", label: "White" },
    { id: "yellow", label: "Yellow" },
    { id: "navy", label: "Navy" },
    { id: "grey", label: "Grey" },
  ];

  const sizeOptions = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" },
    { id: "xxl", label: "XXL" },
  ];

  useEffect(() => {
    if (!category) return;

    setIsLoading(true);

    // Simulate API fetch delay
    setTimeout(() => {
      setFilteredProducts(getProductsByCategory(category));
      setIsLoading(false);
    }, 500);
  }, [category]);

  const handleFilterChange = (filters: FilterState) => {
    let result = category
      ? getProductsByCategory(category as string)
      : [...products];

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply other filters if they are selected
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.gender || "")
      );
    }

    if (filters.subcategories.length > 0) {
      result = result.filter((product) =>
        filters.subcategories.includes(product.subCategory)
      );
    }

    // Note: In a real app, you would have more color and size data to filter on
    // This is simplified for the demo

    setFilteredProducts(result);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize">{category} Collection</h1>
        <p className="text-fashion-secondary mt-2">
          Discover our latest {category} fashion items
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar - 1/4 width on large screens */}
        <div className="lg:w-1/4">
          <ProductFilters
            categories={categoryFilters}
            subcategories={subcategoryFilters}
            colors={colorOptions}
            sizes={sizeOptions}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products - 3/4 width on large screens */}
        <div className="lg:w-3/4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} columns={3} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-fashion-secondary">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// export default CategoryPage;
