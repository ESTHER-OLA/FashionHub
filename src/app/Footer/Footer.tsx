import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-fashion-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/category/men"
                  className="text-gray-300 hover:text-white transition"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/category/women"
                  className="text-gray-300 hover:text-white transition"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/category/children"
                  className="text-gray-300 hover:text-white transition"
                >
                  Children
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sports"
                  className="text-gray-300 hover:text-white transition"
                >
                  Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/category/corporate"
                  className="text-gray-300 hover:text-white transition"
                >
                  Corporate
                </Link>
              </li>
              <li>
                <Link
                  href="/category/combos"
                  className="text-gray-300 hover:text-white transition"
                >
                  Combos
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-white transition"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-gray-300 hover:text-white transition"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white transition"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-gray-300 hover:text-white transition"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="text-gray-300 hover:text-white transition"
                >
                  Store Locations
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-fashion-accent"
              />
              <button className="bg-fashion-accent hover:bg-opacity-90 px-4 py-2 rounded-r-md transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Media */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                Instagram
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                Twitter
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition"
              >
                Pinterest
              </a>
            </div>

            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} StyleHub Fashion. All rights
              reserved.
            </div>
          </div>

          {/* Terms & Privacy */}
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
