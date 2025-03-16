import React from "react";

interface OrderDetails {
  customerName: string;
  email: string;
  phone: string;
}


interface OrderDetailCardProps {
  title: string;
  details: OrderDetails;
}

export const OrderDetailCard: React.FC<OrderDetailCardProps> = ({ title, details }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p>{details.customerName}</p>
      <p>{details.email}</p>
      <p>{details.phone}</p>
    </div>
  );
};