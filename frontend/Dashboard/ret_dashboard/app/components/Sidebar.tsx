"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const projects = [
    { name: "Dashboard", url: "/Dashboard", icon: "/sidebar-icons/dashboard.svg" },
    { name: "Analytics", url: "/Analytics", icon: "/sidebar-icons/analytics.svg" },
    { name: "Product", url: "/Product", icon: "/sidebar-icons/product.svg" },
    { name: "Payment", url: "/Payment", icon: "/sidebar-icons/payment.svg" },
    { name: "Orders", url: "/Orders", icon: "/sidebar-icons/orders.svg" },
    { name: "Settings", url: "/Settings", icon: "/sidebar-icons/settings.svg" },
    { name: "Logout", url: "#", icon: "/sidebar-icons/logout.svg", action: () => setShowLogoutPopup(true) },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authenticated"); // Clear authentication status
    setShowLogoutPopup(false);
    router.push("/auth/login"); // Redirect to Login page
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col top-0 left-0 shadow-md">
      <div className="border-b border-gray-700 flex justify-center">
        <Link href="/Dashboard">
          <Image src="/sidebar-icons/logo.svg" alt="App Logo" width={100} height={30} className="object-contain" />
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          {projects.map((project) => (
            <li key={project.name}>
              <Link
                href={project.url}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md"
                onClick={project.action ? project.action : undefined}
              >
                <Image src={project.icon} alt={project.name} width={24} height={24} className="mr-2" />
                <span>{project.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Need Help Section */}
      <div className="bg-blue-100 text-black p-2 m-4 rounded-md shadow-md">
        <Image src="/images/QSmark.svg" alt="Qs Mark" width={30} height={30} className="mb-2" />
        <h3 className="text-lg font-semibold">Need help?</h3>
        <p className="text-sm mt-1">Please check our docs</p>
        <Link href="/documentation">
          <button className="bg-white text-blue-600 font-bold text-sm py-2 px-4 rounded-md mt-2 w-full">
            DOCUMENTATION
          </button>
        </Link>
      </div>


      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              Are you sure to logout from SellarHub Dashboard?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents event bubbling
                  handleLogout();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                autoFocus
              >
                Yes
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents event bubbling
                  setShowLogoutPopup(false);
                }}
                className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
