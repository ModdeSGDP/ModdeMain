import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-white-800 py-4 ">
      <div className="container mx-auto flex items-center justify-between px-8">
        {/* Welcome Section */}
        <div className="flex items-center space-x-2 md:space-x-12 md:ml-40">
          {/* <Image
            src="/images/maleavatar.svg"
            alt="Profile Picture"
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
          <div>
            <p className="text-sm text-gray-500">Hi, Joel !</p>
            <h1 className="text-xl font-bold text-gray-900">Welcome Back! Incarange</h1>
          </div> */}
        </div>

        {/* Search Bar Section */}
        <div className="flex items-center space-x-2 md:space-x-3 mt-4 md:mt-0">
          {/* Icons Section Moved Closer */}
          <div className="flex items-center space-x-3">
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
                width={40}
                height={40}
                className="cursor-pointer"
              />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </div>
          </div>
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



        

      
        
        


      </div>
    </header>
  );
};

export default Header;
