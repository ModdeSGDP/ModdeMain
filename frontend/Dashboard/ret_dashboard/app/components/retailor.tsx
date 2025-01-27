"use client";

import React from "react";
import Image from "next/image";

interface RetailorProps {
  name: string;
  avatar: string;
  greeting: string;
}

const Retailor: React.FC<RetailorProps> = ({ name, avatar, greeting }) => {
  return (
    <div className="flex items-center space-x-4">
      <Image
        src={avatar}
        alt={`${name}'s Avatar`}
        width={60}
        height={60}
        className="rounded-full object-contain"
      />
      <div>
        <p className="text-sm text-gray-500">{greeting}</p>
        <h1 className="text-xl font-bold text-gray-900">Welcome Back! {name}</h1>
      </div>
    </div>
  );
};

export default Retailor;
