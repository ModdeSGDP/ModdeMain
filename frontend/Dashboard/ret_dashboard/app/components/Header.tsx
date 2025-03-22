import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]");
      setNotificationCount(storedNotifications.length);
    };

    updateCount(); // Load initially
    window.addEventListener("storage", updateCount); // Update on change

    return () => window.removeEventListener("storage", updateCount);
  }, []);
  return (
    <header className="bg-white-800 py-4 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-8">
        {/* Welcome Section */}
        <div className="flex items-center space-x-2 md:space-x-12 md:ml-40">

        </div>

        {/* Search Bar Section */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          {/* Icons Section Moved Closer */}
          <div className="flex items-center space-x-3">
            <Image
              src="/images/messages.svg"
              alt="Chat Icon"
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <Link href="/notifications">
              <div className="relative">
                <Image
                  src="/images/notification-bing.svg"
                  alt="Notification Icon"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-4 flex items-center justify-center rounded-full">
                    {notificationCount}
                  </span>
                )}

              </div>
            </Link>
          </div>



        </div>










      </div>
    </header>
  );
};

export default Header;
