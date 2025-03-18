"use client";
import React, { useState } from "react";
import Summary from "../components/summary";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import DateStatusFilter from "../components/DateStatusFilter";
import RecentPurchases from "../components/RecentPurchases";



function page() {
  // Dynamic data (could be fetched from an API in real implementation)
  const dashboardData = {
    completedOrders: 300,
    pendingOrders: 10,
    cancelledOrders: 100,
    totalUsers: 350
  };

  // Dynamic retailer data
  const retailerOrders = [
    { id: 25426, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Komal", image: "/images/Customer_avatar.svg" }, status: "Delivered", amount: "LKR 4500.00" },
    { id: 25425, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Nikhil", image: "/images/Customer_avatar.svg" }, status: "Canceled", amount: "LKR 4500.00" },
    { id: 25424, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Nimal", image: "/images/Customer_avatar.svg" }, status: "Delivered", amount: "LKR 4500.00" },
    { id: 25423, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Kushan", image: "/images/Customer_avatar.svg" }, status: "Pending", amount: "LKR 4500.00" },
    { id: 25422, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Kidura", image: "/images/Customer_avatar.svg" }, status: "Delivered", amount: "LKR 4500.00" },
    { id: 25421, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Yougesh", image: "/images/Customer_avatar.svg" }, status: "Delivered", amount: "LKR 4500.00" },
    { id: 25420, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Priyantha", image: "/images/Customer_avatar.svg" }, status: "Canceled", amount: "LKR 4500.00" },
    { id: 25419, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Kishan", image: "/images/Customer_avatar.svg" }, status: "Delivered", amount: "LKR 4500.00" },
    { id: 25418, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Kumal", image: "/images/Customer_avatar.svg" }, status: "Pending", amount: "LKR 4500.00" },
    { id: 25417, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Priyanka", image: "/images/Customer_avatar.svg" }, status: "Canceled", amount: "LKR 4500.00" },
    { id: 25416, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Nuwan", image: "/images/Customer_avatar.svg" }, status: "Pending", amount: "LKR 4500.00" },
    { id: 25415, product: "Lorem Ipsum", date: "Dec 16th, 2024", customer: { name: "Dumal", image: "/images/Customer_avatar.svg" }, status: "Delivered", amount: "LKR 4500.00" }
  ];


  const [currentPage, setCurrentPage] = useState(1); // CHANGED: Added pagination state
  const itemsPerPage = 5; // CHANGED: Define items per page
  const totalPages = Math.max(1, Math.ceil(retailerOrders.length / itemsPerPage)); // CHANGED: Calculate total pages

  // CHANGED: Get only the orders for the current page
  const paginatedOrders = retailerOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );




  return (
    <div className="pt-0 pl-4">

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

        {/* Orders Table */}
        <RecentPurchases orders={paginatedOrders} />



      </div>

      {/* CHANGED: Dynamic Pagination */}
      <div className="mt-6 w-full flex">
        <div className="w-fit">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {totalPages > 0 &&
                [...Array(Math.max(1, totalPages))].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}


              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage((prev) => prev + 1);
                    }
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
















  )
}

export default page