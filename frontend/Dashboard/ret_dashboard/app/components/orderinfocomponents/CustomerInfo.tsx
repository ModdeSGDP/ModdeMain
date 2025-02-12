"use client";

import { Button } from "@/components/ui/button";

interface CustomerInfoProps {
  customer?: { // Make it optional
    name: string;
    email: string;
    phone: string;
    
  };
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ 
  customer = { 
    name: "Not Available", 
    email: "Not Available", 
    phone: "Not Available" 
  } 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
     
      <p><strong>Full Name:</strong> {customer?.name || "Not Available"}</p>
      <p><strong>Email:</strong> {customer?.email || "Not Available"}</p>
      <p><strong>Phone:</strong> {customer?.phone || "Not Available"}</p>
      <Button className="bg-red-500 text-white mt-4">View Profile</Button>
    </div>
  );
};

export default CustomerInfo;
