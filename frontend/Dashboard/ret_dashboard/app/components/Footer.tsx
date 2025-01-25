"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"

 

 



export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-8 border-t border-gray-300 fixed bottom-0 left-0 z-50 shadow-lg">
      {/* Centered Branding */}
      <div className="text-center mb-6">
        <Link href="/">
          <Image
            src="/images/Component 2.png"
            alt="Footer Logo"
            width={120}
            height={40}
            className="object-contain mx-auto"
          />
        </Link>
        <p className="text-gray-600 mt-2 text-sm">
          Your trusted platform for connecting businesses and users.
        </p>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12 text-gray-700 text-sm">
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

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mt-6">
        <Link
          href="https://www.facebook.com/YourBrand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/images/Ellipse 11.png"
              alt="Facebook Background"
              fill
              className="object-contain"
            />
            <Image
              src="/images/facebook.png"
              alt="Facebook Icon"
              width={20}
              height={20}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </Link>
        <Link
          href="https://twitter.com/YourBrand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/images/Ellipse 12.png"
              alt="Twitter Background"
              fill
              className="object-contain"
            />
            <Image
              src="/images/twitter.png"
              alt="Twitter Icon"
              width={20}
              height={20}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </Link>
        <Link
          href="https://www.youtube.com/YourBrand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-10 h-10">
            <Image
              src="/images/Ellipse 13.png"
              alt="YouTube Background"
              fill
              className="object-contain"
            />
            <Image
              src="/images/youtube.png"
              alt="YouTube Icon"
              width={20}
              height={20}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </Link>
      </div>
      
     

      {/* Copyright Information */}
      <div className="text-center text-gray-500 text-xs mt-6">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}
