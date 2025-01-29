import React from 'react'
import Summary from "../components/summary";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import DateStatusFilter from "../components/DateStatusFilter";



function page() {
  // Dynamic data (could be fetched from an API in real implementation)
  const dashboardData = {
    completedOrders: 300,
    pendingOrders: 10,
    cancelledOrders: 100,
    totalUsers: 350
  };
  


  return (
    <div className="pt-0 pl-64">
     
      <div>
            <h1 className="font-bold text-2xl mb-2">Orders List</h1><Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/Analytics">Analytics</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Horizontal Line */}
        <hr className="my-4 border-gray-300" />


      {/* Summary Section */}
      <div className="mt-4"> {/* Added margin-top */}
        <Summary
          completedOrders={dashboardData.completedOrders}
          pendingOrders={dashboardData.pendingOrders}
          cancelledOrders={dashboardData.cancelledOrders}
          totalUsers={dashboardData.totalUsers}
        />
      </div>

      {/* Date & Status Filter Section */}
      <DateStatusFilter />

   


           


        </div>

      
    </div>
  )
}

export default page