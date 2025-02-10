"use client";

import { Button } from "@/components/ui/button";

interface OrderInfoProps {
  order?: { // Make it optional
    shipping: string;
    paymentMethod: string;
    status: string;
  };
}

const OrderInfo: React.FC<OrderInfoProps> = ({ 
  order = { 
    shipping: "Not Available", 
    paymentMethod: "Not Available", 
    status: "Not Available" 
  } 
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Order Info</h3>
      <p><strong>Shipping:</strong> {order?.shipping || "Not Available"}</p>
      <p><strong>Payment Method:</strong> {order?.paymentMethod || "Not Available"}</p>
      <p><strong>Status:</strong> {order?.status || "Not Available"}</p>
      <Button className="bg-gray-200 text-gray-700 mt-4">Download Info</Button>
    </div>
  );
};

export default OrderInfo;
