"use client";

import Image from "next/image";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className="w-[calc(100%-16rem)] bg-gray-100 py-1 border-t border-gray-300 fixed bottom-0 left-0 md:left-64 z-50 shadow-lg">
     
      

      {/* Footer Navigation */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-gray-700 text-sm">
        <Link href="/about">
          <span className="hover:text-[#f56d6d] transition duration-300">
            About Us
          </span>
        </Link>
        <Link href="/privacy">
          <span className="hover:text-[#f56d6d] transition duration-300">
            Privacy Policy
          </span>
        </Link>
        <Link href="/terms">
          <span className="hover:text-[#f56d6d] transition duration-300">
            Terms of Service
          </span>
        </Link>
        <Link href="/contact">
          <span className="hover:text-[#f56d6d] transition duration-300">
            Contact
          </span>
        </Link>
      </div>


      {/* Copyright Information */}
      <div className="text-center text-gray-500 text-xs mt-4">
        © {new Date().getFullYear()} - Modde SellerHub Dashboard
      </div>
    </footer>
  );
}
