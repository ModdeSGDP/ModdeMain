


"use client";

import React from "react";
import Image from "next/image";

interface Order {
  id: number;
  product: string;
  date: string;
  customer: {
    name: string;
    image: string;
  }
  status: string;
  amount: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-2">
      <h2 className="font-bold text-lg mb-2">Recent Purchases</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {/* Checkbox before Product header */}
              <th className="p-3">
                <input type="checkbox" className="w-4 h-4" />
              </th>
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Order ID</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                {/* Checkbox for each product row */}
                <td className="p-3">
                  <input type="checkbox" className="w-4 h-4" />
                </td>
                <td className="p-3">{order.product}</td>
                <td className="p-3 font-medium">#{order.id}</td>
                <td className="p-3">{order.date}</td>

                {/* Customer profile image + name */}
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    {/* <Image
                      src={order.customer.image}
                      alt={order.customer.name}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    /> */}
                    <span>{order.customer.name}</span>
                  </div>
                </td>

                {/* Status with colored dot */}
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-3 h-3 rounded-full ${order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                        }`}
                    ></span>
                    <span>{order.status}</span>
                  </div>
                </td>

                <td className="p-3">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
