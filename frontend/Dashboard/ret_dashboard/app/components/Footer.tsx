"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-[calc(100%-16rem)] bg-gray-100 py-4 border-t border-gray-300 fixed bottom-0 left-64 z-50 shadow-lg">
      {/* Centered Branding */}
      <div className="text-center mb-4">
        <Link href="/">
          <Image
            src="/images/logo.svg" 
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

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-4 mt-4">
        <Link
          href="https://www.facebook.com/YourBrand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-8 h-8">
            <Image
              src="/images/Ellipse9.png"
              alt="Facebook Background"
              fill
              className="object-contain"
            />
            <Image
              src="/images/facebook.png"
              alt="Facebook Icon"
              width={12}
              height={12}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </Link>
        <Link
          href="https://twitter.com/YourBrand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-8 h-8">
            <Image
              src="/images/Ellipse9.png"
              alt="Twitter Background"
              fill
              className="object-contain"
            />
            <Image
              src="/images/instagram.png"
              alt="Instagram Icon"
              width={12}
              height={12}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </Link>
        <Link
          href="https://www.youtube.com/YourBrand"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-8 h-8">
            <Image
              src="/images/Ellipse9.png"
              alt="YouTube Background"
              fill
              className="object-contain"
            />
            <Image
              src="/images/linkedin.png"
              alt="Linkedin Icon"
              width={14}
              height={14}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </Link>
      </div>

      {/* Copyright Information */}
      <div className="text-center text-gray-500 text-xs mt-4">
        © {new Date().getFullYear()} YourBrand. All rights reserved.
      </div>
    </footer>
  );
}
