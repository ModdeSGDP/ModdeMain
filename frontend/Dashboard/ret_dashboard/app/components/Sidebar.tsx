"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const projects = [
    {
      name: "Dashboard",
      url: "/Dashboard",
      icon: "/sidebar-icons/dashboard.svg",
    },
    {
      name: "Analytics",
      url: "/Analytics",
      icon: "/sidebar-icons/analytics.svg",
    },
    {
      name: "Product",
      url: "/Product",
      icon: "/sidebar-icons/product.svg",
    },
    {
      name: "Payment",
      url: "/Payment",
      icon: "/sidebar-icons/payment.svg",
    },
    {
      name: "Orders",
      url: "/Orders",
      icon: "/sidebar-icons/orders.svg",
    },
    {
      name: "Settings",
      url: "/Settings",
      icon: "/sidebar-icons/settings.svg",
    },
    {
      name: "Logout",
      url: "/Logout",
      icon: "/sidebar-icons/logout.svg",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed top-0 left-0 shadow-md">
      <div className="border-b border-gray-700 flex justify-center">
        <Link href="/Dashboard">
          <Image
            src="/sidebar-icons/logo.svg"
            alt="App Logo"
            width={100}
            height={30}
            className="object-contain"
          />
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          {projects.map((project) => (
            <li key={project.name}>
              <Link
                href={project.url}
                className="flex items-center p-2 hover:bg-gray-700 rounded-md"
              >
                <Image
                  src={project.icon}
                  alt={project.name}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <span>{project.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
       {/* Need Help Section */}
      <div className="bg-blue-100 text-black p-2 m-4 rounded-md shadow-md">
        <Image 
          src="/images/QSmark.svg"
          alt="Qs Mark"
          width={30}
          height={30}
          className="mb-2"
        />
        <h3 className="text-lg font-semibold">Need help?</h3>
        <p className="text-sm mt-1">Please check our docs</p>
        <Link href="/documentation">
          <button className="bg-white text-blue-600 font-bold text-sm py-2 px-4 rounded-md mt-2 w-full">
            DOCUMENTATION
          </button>
        </Link>
      </div>

    </div>
  );
}
