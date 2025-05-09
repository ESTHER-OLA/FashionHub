"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileMenuOpen) setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const categoryNames = [
    "Men",
    "Women",
    "Children",
    "Sports",
    "Corporate",
    "Combos",
  ];
  const categories = categoryNames.map((name) => ({
    name,
    path: `/category/${name.toLowerCase()}`,
  }));

  // const categories = [
  //   { name: "Men", path: "/category/men" },
  //   { name: "Women", path: "/category/women" },
  //   { name: "Children", path: "/category/children" },
  //   { name: "Sports", path: "/category/sports" },
  //   { name: "Corporate", path: "/category/corporate" },
  //   { name: "Combos", path: "/category/combos" },
  // ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-2xl text-fashion-primary">
            FashionHub
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="text-fashion-secondary hover:text-fashion-primary transition-colors"
            >
              Store
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/category/${category.name.toLowerCase()}`}
                className="text-fashion-secondary hover:text-fashion-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="/search"
              className="text-fashion-secondary hover:text-fashion-primary"
            >
              <Search />
            </Link>

            <Link
              href="/wishlist"
              className="text-fashion-secondary hover:text-fashion-primary relative"
            >
              <Heart />
              {wishlistItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-fashion-primary">
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>

            <Link
              href="/cart"
              className="text-fashion-secondary hover:text-fashion-primary relative"
            >
              <ShoppingCart />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-fashion-primary">
                  {totalItems}
                </Badge>
              )}
            </Link>

            <div className="relative">
              <Button
                onClick={toggleProfileMenu}
                className="text-fashion-secondary hover:text-fashion-primary focus:outline-none"
                aria-label="User menu"
              >
                <User />
              </Button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium">
                          Welcome, {user?.name}
                        </p>
                        <p className="text-xs text-fashion-secondary truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/profile/order"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Orders
                      </Link>
                      <Link
                        href="/profile/wishlist"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        My Wishlist
                      </Link>
                      <Button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t">
            <div className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.path}
                  className="text-fashion-secondary hover:text-fashion-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className="flex justify-around mt-6 pt-4 border-t">
              <Link
                href="/search"
                className="text-fashion-secondary hover:text-fashion-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search />
              </Link>
              <Link
                href="/wishlist"
                className="text-fashion-secondary hover:text-fashion-primary relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-fashion-primary">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Link>
              <Link
                href="/cart"
                className="text-fashion-secondary hover:text-fashion-primary relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-fashion-primary">
                    {totalItems}
                  </Badge>
                )}
              </Link>
              <Link
                href={isAuthenticated ? "/profile" : "/login"}
                className="text-fashion-secondary hover:text-fashion-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <User />
              </Link>
            </div>

            {isAuthenticated && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium">Welcome, {user?.name}</p>
                <div className="mt-2 flex flex-col space-y-2">
                  <Link
                    href="/profile"
                    className="text-sm hover:text-fashion-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="text-sm hover:text-fashion-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/profile/wishlist"
                    className="text-sm hover:text-fashion-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Wishlist
                  </Link>
                  <Button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-left hover:text-fashion-primary"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}

            {!isAuthenticated && (
              <div className="mt-4 pt-4 border-t flex flex-col space-y-2">
                <Link
                  href="/login"
                  className="text-sm hover:text-fashion-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="text-sm hover:text-fashion-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

// fashion: {
//   primary: "#2d3748",
//   secondary: "#718096",
//   accent: "#38b2ac",
//   muted: "#e2e8f0",
//   light: "#f7fafc",
//   dark: "#1a202c",
// },
