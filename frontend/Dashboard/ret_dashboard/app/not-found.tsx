"use client"

import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src="/images/404.svg"
        alt="404 Page Not Found"
        width={500}
        height={350}
        className="mb-6"
      />

      {/* 404 Text */}
      <h1 className="text-3xl font-bold text-gray-900">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-6 text-lg">Oops! The page you are looking for does not exist.</p>

      {/* Redirect Button */}
      <Link href="/Dashboard">
        <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
          Go to Dashboard
        </button>
      </Link>
     
    </div>
  );
}
