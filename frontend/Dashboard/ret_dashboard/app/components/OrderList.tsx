"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Order {
  id: number;
  customer: string;
  total: string;
  profit: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [orderData, setOrderData] = useState<Order[]>([]);

  //  Ensure unique order IDs in localStorage to prevent duplicate keys
  useEffect(() => {
    const savedOrders = localStorage.getItem("orderData");
    if (savedOrders) {
      const parsedOrders: Order[] = JSON.parse(savedOrders);

      //  Remove duplicate orders using a Map
      const uniqueOrders = Array.from(new Map(parsedOrders.map(order => [order.id, order])).values());

      setOrderData(uniqueOrders);
    } else {
      setOrderData(orders);
    }
  }, [orders]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-4">
      {/* Orders Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="text-left p-3">ORDER ID</th>
              <th className="text-left p-3">CUSTOMER</th>
              <th className="text-left p-3">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <tr key={`${order.id}-${index}`} className="border-b">
                <td className="p-3 font-medium">
                  <Link href={`/OrderInfo/${order.id}`} className="text-blue-600 hover:underline">
                    #{order.id}
                  </Link>
                </td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Orders Found Message */}
      {orderData.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;


