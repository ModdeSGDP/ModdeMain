"use client";

import Image from "next/image";
import Link from "next/link";

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
      name: "Enquiry",
      url: "/Enquiry",
      icon: "/sidebar-icons/enquiry.svg",
    },
    {
      name: "Marketing",
      url: "/Marketing",
      icon: "/sidebar-icons/marketing.svg",
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
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col fixed">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold">My App</h1>
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
    </div>
  );
}
