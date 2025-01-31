import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Switch } from "@/components/ui/switch"

function page() {
  return (
    <div className="pt-0 pl-64">
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
 {/* Main Content Section */}
      <div className="mt-8 flex flex-col items-center w-full">
        {/* Revenue & Subscription Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {/* Amount of Revenue Section */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[350px] h-[160px] flex flex-col ">
            <h2 className="font-bold text-lg mb-1">Amount of Revenue</h2>
            <p className="text-2xl font-bold">LKR 205,565</p>
            <div className="flex  mt-2">
              <span className="text-green-500 bg-green-100 px-2 py-1 text-xs rounded-md">
                ▲ 20%
              </span>
              <span className="text-gray-500 ml-2 text-sm">LKR 200,452</span>
            </div>
          </div>

          {/* Subscription Charges Section */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[350px] h-[160px] flex flex-col ">
            <h2 className="font-bold text-lg mb-1">Subscription Charges</h2>
            <p className="text-2xl font-bold">LKR 7,956</p>
            <div className="flex mt-2">
              <span className="text-red-500 bg-red-100 px-2 py-1 text-xs rounded-md">
                ▼ 15%
              </span>
              <span className="text-gray-500 ml-2 text-sm">6,759</span>
            </div>
          </div>
        </div>

        {/* Saved Bank Account Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-2 w-full md:w-[500px]">
          <h2 className="font-bold text-lg mb-4">Saved Bank Account</h2>
          <p className="text-gray-500">Bank Name: <span className="text-blue-600 font-medium">Commercial Bank</span></p>
          <p className="text-gray-500">Account Holder Name: <span className="text-blue-600 font-medium">Joel Thilekeratne</span></p>
          <p className="text-gray-500">Account Number: <span className="text-blue-600 font-medium">12035555544</span></p>
          <p className="text-gray-500">Branch Name: <span className="text-blue-600 font-medium">Colpetty Main Branch</span></p>

          {/* Add New Account Button */}
          <button className="bg-red-400 text-white w-full py-2 rounded-md font-medium mt-4 hover:bg-red-600">
            + ADD NEW ACCOUNT
          </button>

          {/* Deactivate Account Toggle */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-gray-500">Deactivate Account</span>
            <Switch />
          </div>
        </div>
      </div>

        
     
    </div>
  );
}

export default page;
