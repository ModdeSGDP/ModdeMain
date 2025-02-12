"use client";

import { Button } from "@/components/ui/button";

interface DeliveryInfoProps {
  delivery?: { // Make it optional
    address: string;
  };
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ delivery = { address: "Not Available" } }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p><strong>Address: </strong></p>
      <p>{delivery?.address || "Address Not Provided"}</p> {/* Prevents undefined error */}
      <Button className="bg-red-500 text-white mt-4">View Profile</Button>
    </div>
  );
};

export default DeliveryInfo;
