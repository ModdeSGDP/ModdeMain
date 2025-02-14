'use client'
import React from 'react'
import Image from 'next/image'

interface SummaryProps {
  completedOrders: number;
  pendingOrders: number;
  cancelledOrders: number;
  totalUsers: number;
}

const Summary: React.FC<SummaryProps> = ({ completedOrders, pendingOrders, cancelledOrders, totalUsers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-4 px-16">
      
      {/* Orders Completed */}
      <div className="flex items-center space-x-3 bg-green-100 p-3 rounded-lg shadow-md w-30">
        <Image src="/images/library_add_check.svg" alt="Orders Completed" width={30} height={30} />
        <div>
          <p className="text-gray-500">Orders Completed</p>
          <h1 className="text-lg font-bold">{completedOrders}K</h1>
        </div>
      </div>

      {/* Orders Pending */}
      <div className="flex items-center space-x-3 bg-blue-100 p-3 rounded-lg shadow-md w-30">
        <Image 
        src="/images/hourglass.svg" 
        alt="Orders Pending" 
        width={30} 
        height={30} 
        />
        <div>
          <p className="text-gray-500">Orders Pending</p>
          <h1 className="text-lg font-bold">{pendingOrders}K</h1>
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

      {/* Total Users */}
      <div className="flex items-center space-x-3 bg-purple-100 p-3 rounded-lg shadow-md w-30">
        <Image src="/images/person.svg" alt="Total Users" width={30} height={40} />
        <div>
          <p className="text-gray-500">Total Users</p>
          <h1 className="text-lg font-bold">{totalUsers}K</h1>
        </div>
      </div>
    </div>
  )
}

export default Summary;
