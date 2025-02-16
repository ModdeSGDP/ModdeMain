import React from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import PaymentDetails from "@/app/components/PaymentDetails";

function Page() {
  // Example Data (Replace with real API data later)
  const paymentData = {
    revenue: 205565,
    revenueChange: 20,
    subscription: 7956,
    subscriptionChange: -15,
    bankDetails: {
      bankName: "Commercial Bank",
      accountHolder: "Joel Thilekeratne",
      accountNumber: "12035555544",
      branchName: "Colpetty Main Branch",
    },
  };

  return (
    <div className="pt-0 pl-4">
      {/* Payment Heading */}
      <h1 className="font-bold text-2xl mb-2">Payment</h1>

      {/* Breadcrumb Positioned Under Payment Heading & Right-Aligned */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/Orders">Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Payment</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <hr className="my-4 border-gray-300" />

      {/* Dynamic Payment Details Component */}
      <PaymentDetails {...paymentData} />
    </div>
  );
}

export default Page;
