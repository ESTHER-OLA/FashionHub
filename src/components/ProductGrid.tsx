import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  size?: "default" | "small";
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
  size = "default",
}) => {
  // Determine the grid columns based on props
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${gridCols} gap-4 sm:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} size={size} />
      ))}
    </div>
  );
};

export default ProductGrid;
