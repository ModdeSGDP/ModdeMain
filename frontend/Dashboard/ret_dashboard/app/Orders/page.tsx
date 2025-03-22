"use client";

import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import OrderList from "../components/OrderList";
import { orders as retailerOrders } from "../data/orders";

function Page() {

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
      <h1 className="font-bold text-2xl mb-2">Orders</h1>

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/Settings">Settings</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <hr className="my-4 border-gray-300" />

      {/* Order List Component with Filtering */}
      <OrderList orders={paginatedOrders} />


      {/* CHANGED: Dynamic Pagination */}
      <div className="mt-6 w-full flex">

        <div className="w-fit">
          <Pagination>
            <PaginationContent>
              {/* Previous Button - Prevent Click if on First Page */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage((prev) => prev - 1);
                    }
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} // FIXED: Disable click when on first page
                />
              </PaginationItem>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Next Button - Prevent Click if on Last Page */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage((prev) => prev + 1);
                    }
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""} // FIXED: Disable click when on last page
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>


      </div>

    </div>
  );
}

export default Page;
