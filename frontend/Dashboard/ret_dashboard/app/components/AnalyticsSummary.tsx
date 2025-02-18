'use client';
import React from 'react';
import Image from 'next/image';

interface AnalyticsSummaryProps {
  productViews: number;
  newOrders: number;
  cancelledOrders: number;
  totalVisitors: number;
}

const AnalyticsSummary: React.FC<AnalyticsSummaryProps> = ({ productViews, newOrders, cancelledOrders, totalVisitors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4 px-8">
      
      {/* Product Views */}
      <div className="flex items-center space-x-3 bg-green-100 p-3 rounded-lg shadow-md w-30">
        <Image src="/images/productview.svg" alt="Product Views" width={60} height={40} />
        <div>
          <p className="text-gray-500">Product Views</p>
          <h1 className="text-lg font-bold">{productViews}K</h1>
        </div>
      </div>

      {/* New Orders */}
      <div className="flex items-center space-x-3 bg-blue-100 p-3 rounded-lg shadow-md w-30">
        <Image src="/images/neworders.svg" alt="New Orders" width={40} height={40} />
        <div>
          <p className="text-gray-500">New Orders</p>
          <h1 className="text-lg font-bold">{newOrders}K</h1>
        </div>
      </div>

      {/* Orders Cancelled */}
      <div className="flex items-center space-x-3 bg-red-100 p-3 rounded-lg shadow-md w-30">
        <Image src="/images/cancel.svg" alt="Orders Cancelled" width={30} height={40} />
        <div>
          <p className="text-gray-500">Orders Cancelled</p>
          <h1 className="text-lg font-bold">{cancelledOrders}K</h1>
        </div>
      </div>

      {/* Total Visitors */}
      <div className="flex items-center space-x-3 bg-purple-100 p-3 rounded-lg shadow-md w-30">
        <Image src="/images/person.svg" alt="Total Visitors" width={30} height={40} />
        <div>
          <p className="text-gray-500">Total Visitors</p>
          <h1 className="text-lg font-bold">{totalVisitors}K</h1>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsSummary;
