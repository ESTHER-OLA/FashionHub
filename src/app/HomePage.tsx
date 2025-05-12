import React from "react";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  getFeaturedProducts,
  getNewArrivals,
  getSaleProducts,
} from "@/data/products";

const HomePage = () => {
  const featuredProducts = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);
  const saleProducts = getSaleProducts(4);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-fashion-dark text-white">
      <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/Images/homePageImg.avif"
              alt="homePageImg"
              fill
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="relative px-4 py-24 sm:px-6 sm:py-32 lg:py-40 lg:px-8 max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Spring 2025 Collection
            </h1>
            <p className="text-lg mb-8">
              Discover the latest trends and styles for the new season.
            </p>
            <div className="space-x-4">
              <Link href="/category/women">
                <Button
                  size="lg"
                  className="bg-white text-fashion-dark hover:bg-gray-200"
                >
                  Shop Women
                </Button>
              </Link>
              <Link href="/category/men">
                <Button
                  size="lg"
                  className="bg-white text-fashion-dark hover:bg-gray-200"
                >
                  Shop Men
                </Button>
              </Link>
            </div>
          </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Shop By Category
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                name: "Men",
                image: "/Images/image25.avif",
                path: "/category/men",
              },
              {
                name: "Women",
                image: "/Images/image26.avif",
                path: "/category/women",
              },
              {
                name: "Children",
                image: "/Images/image27.avif",
                path: "/category/children",
              },
              {
                name: "Sports",
                image: "/Images/image28.avif",
                path: "/category/sports",
              },
              {
                name: "Corporate",
                image: "/Images/image29.avif",
                path: "/category/corporate",
              },
              {
                name: "Combos",
                image: "/Images/image15.avif",
                path: "/category/combos",
              },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.path}
                className="block group relative w-full overflow-hidden rounded-lg hover-scale"
              >
                <div className="h-40 sm:h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Products
            </h2>
            <Link
              href="/products"
              className="text-fashion-accent hover:underline"
            >
              View All
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* New Arrivals & Sale Split Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* New Arrivals */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold">New Arrivals</h2>
                <Link
                  href="/new-arrivals"
                  className="text-fashion-accent hover:underline"
                >
                  View All
                </Link>
              </div>
              <ProductGrid products={newArrivals} columns={2} />
            </div>

            {/* Sale Products */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold">Sale Products</h2>
                <Link
                  href="/sale"
                  className="text-fashion-accent hover:underline"
                >
                  View All
                </Link>
              </div>
              <ProductGrid products={saleProducts} columns={2} />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-fashion-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, fashion news, and
            first access to new collections.
          </p>

          <div className="flex flex-col sm:flex-row max-w-md mx-auto sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded flex-1 text-fashion-dark focus:outline-none focus:ring-2 focus:ring-fashion-accent"
            />
            <Button className="bg-fashion-accent hover:bg-fashion-accent/90 px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
