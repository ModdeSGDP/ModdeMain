"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Retailor = () => {
  const [retailorData, setRetailorData] = useState({
    name: "InCaranage",
    avatar: "/images/maleavatar.svg",
    greeting: "Hi, User!",
  });

  // Fetch data from localStorage on mount and listen for changes
  useEffect(() => {
    const fetchRetailorData = () => {
      const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const savedProfilePic = localStorage.getItem("profilePicture");

      setRetailorData({
        name: savedUser.companyName || "InCaranage",
        avatar: savedProfilePic || "/images/maleavatar.svg",
        greeting: `Hi, ${savedUser.firstName || "user"}!`,
      });
    };

    fetchRetailorData();

    // Listen for updates when ProfileForm updates localStorage
    window.addEventListener("storage", fetchRetailorData);

    return () => {
      window.removeEventListener("storage", fetchRetailorData);
    };
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <Image
        src={retailorData.avatar}
        alt="Retailor Avatar"
        width={80}
        height={80}
        className="rounded-full w-12 h-12 object-cover border-2 border-gray-300"
      />
      <div>
        <p className="text-sm text-gray-500">{retailorData.greeting}</p>
        <h1 className="text-xl font-bold text-gray-900">Welcome {retailorData.name}!</h1>
      </div>
    </div>
  );
};

export default Retailor;
