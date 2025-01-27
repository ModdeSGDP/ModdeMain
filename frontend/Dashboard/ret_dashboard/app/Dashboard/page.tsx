import React from 'react'
import Summary from "../components/summary";
import Retailor from "../components/retailor";


function page() {
  // Dynamic data (could be fetched from an API in real implementation)
  const dashboardData = {
    completedOrders: 300,
    pendingOrders: 10,
    cancelledOrders: 100,
    totalUsers: 350
  };
  const retailorData = {
    name: "Incarange",
    avatar: "/images/maleavatar.svg", // Adjust path based on your project structure
    greeting: "Hi, Joel !",
  };


  return (
     <div className="pt-0 pl-64">
      {/* Retailor Details Section */}
      <div className="flex justify-between items-center mb-2 mt-[-80px]">
        <Retailor {...retailorData} />
      </div>
      <Summary
        completedOrders={dashboardData.completedOrders}
        pendingOrders={dashboardData.pendingOrders}
        cancelledOrders={dashboardData.cancelledOrders}
        totalUsers={dashboardData.totalUsers}
      />
      <div>
        {/* Additional content goes here */}
      </div>
    </div>
  )
}

export default page