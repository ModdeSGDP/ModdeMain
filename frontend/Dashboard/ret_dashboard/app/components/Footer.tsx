"use client";


import Link from "next/link";


export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-2 border-t border-gray-300 mt-8 shadow-lg">
     
      

      {/* Footer Navigation */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-gray-700 text-sm">
        <Link href="/Aboutus">
          <span className="hover:text-[#f56d6d] transition duration-300">
            About Us
          </span>
        </Link>
        <Link href="/PrivacyPolicy">
          <span className="hover:text-[#f56d6d] transition duration-300">
            Privacy Policy
          </span>
        </Link>
        
        <Link href="/Contact">
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
