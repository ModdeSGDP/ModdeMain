import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import OrderList from "../components/OrderList";

function Page() {
  // Dynamic order data including profit
  const retailerOrders = [
    { id: 25426, customer: "Komal", total: "LKR 4500.00", profit: "LKR 150.00", status: "Delivered" },
    { id: 25425, customer: "Nikhil", total: "LKR 4500.00", profit: "LKR 160.00", status: "Canceled" },
    { id: 25424, customer: "Nimal", total: "LKR 4500.00", profit: "LKR 120.00", status: "Delivered" },
    { id: 25423, customer: "Kushan", total: "LKR 4500.00", profit: "LKR 140.00", status: "Pending" },
    { id: 25422, customer: "Kidura", total: "LKR 4500.00", profit: "LKR 110.00", status: "Delivered" },
    { id: 25421, customer: "Yougesh", total: "LKR 4500.00", profit: "LKR 180.00", status: "Processing" },
    { id: 25420, customer: "Priyantha", total: "LKR 4500.00", profit: "LKR 130.00", status: "Canceled" },
    { id: 25419, customer: "Kishan", total: "LKR 4500.00", profit: "LKR 145.00", status: "Shipped" },
    { id: 25417, customer: "Kumal", total: "LKR 4500.00", profit: "LKR 135.00", status: "Pending" },
    { id: 25412, customer: "Priyanka", total: "LKR 4500.00", profit: "LKR 125.00", status: "Picked" },
    { id: 25413, customer: "Nuwan", total: "LKR 4500.00", profit: "LKR 175.00", status: "Confirmed" },
    { id: 254, customer: "Dumal", total: "LKR 4500.00", profit: "LKR 190.00", status: "Delivered" }
  ];

  return (
    <div className="pt-0 pl-64">
      <h1 className="font-bold text-2xl mb-2">Orders</h1>

      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/Enquiry">Enquiry</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <hr className="my-4 border-gray-300" />

      {/* Order List Component with Filtering */}
      <OrderList orders={retailerOrders} />

      {/* Pagination (Move to Left Side) */}
      <div className="mt-6 w-full flex">
        <div className="w-fit">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Page;
