import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white-800 text-white py-4 ">
      <div className="container mx-auto flex items-center justify-between px-8">
        {/* Welcome Section */}
        <div className="flex items-center space-x-5 ml-8">
          <Image
            src="/images/maleavatar.png"
            alt="Profile Picture"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">Hi, Joel !</p>
            <h1 className="text-xl font-bold text-gray-900">Welcome Back! Incarange</h1>
          </div>
        </div>

        {/* Icons Section */}
        <div className="flex items-center space-x-4 mr-4">
          <Image
            src="/images/messages.svg"
            alt="Chat Icon"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <div className="relative">
            <Image
              src="/images/notification-bing.svg"
              alt="Notification Icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full"></span>
          </div>
        </div>

      
        {/* Search Bar */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-full px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-r-lg"
          >
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
