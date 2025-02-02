import React from "react";
import { Switch } from "@/components/ui/switch";

interface BankDetails {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  branchName: string;
}

interface PaymentDetailsProps {
  revenue: number;
  revenueChange: number;
  subscription: number;
  subscriptionChange: number;
  bankDetails: BankDetails;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  revenue,
  revenueChange,
  subscription,
  subscriptionChange,
  bankDetails,
}) => {
  return (
    <div className="mt-8 flex flex-col items-center w-full">
      {/* Revenue & Subscription Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Amount of Revenue Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[350px] h-[160px] flex flex-col">
          <h2 className="font-bold text-lg mb-1">Amount of Revenue</h2>
          <p className="text-2xl font-bold">LKR {revenue.toLocaleString()}</p>
          <div className="flex mt-2">
            <span
              className={`px-2 py-1 text-xs rounded-md ${
                revenueChange >= 0 ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"
              }`}
            >
              {revenueChange >= 0 ? `▲ ${revenueChange}%` : `▼ ${Math.abs(revenueChange)}%`}
            </span>
            <span className="text-gray-500 ml-2 text-sm">
              LKR {(revenue / (1 + revenueChange / 100)).toFixed(0)}
            </span>
          </div>
        </div>

        {/* Subscription Charges Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-[350px] h-[160px] flex flex-col">
          <h2 className="font-bold text-lg mb-1">Subscription Charges</h2>
          <p className="text-2xl font-bold">LKR {subscription.toLocaleString()}</p>
          <div className="flex mt-2">
            <span
              className={`px-2 py-1 text-xs rounded-md ${
                subscriptionChange >= 0 ? "text-green-500 bg-green-100" : "text-red-500 bg-red-100"
              }`}
            >
              {subscriptionChange >= 0 ? `▲ ${subscriptionChange}%` : `▼ ${Math.abs(subscriptionChange)}%`}
            </span>
            <span className="text-gray-500 ml-2 text-sm">
              LKR {(subscription / (1 + subscriptionChange / 100)).toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Saved Bank Account Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-2 w-full md:w-[500px]">
        <h2 className="font-bold text-lg mb-4">Saved Bank Account</h2>
        <p className="text-gray-500">
          Bank Name: <span className="text-blue-600 font-medium">{bankDetails.bankName}</span>
        </p>
        <p className="text-gray-500">
          Account Holder Name: <span className="text-blue-600 font-medium">{bankDetails.accountHolder}</span>
        </p>
        <p className="text-gray-500">
          Account Number: <span className="text-blue-600 font-medium">{bankDetails.accountNumber}</span>
        </p>
        <p className="text-gray-500">
          Branch Name: <span className="text-blue-600 font-medium">{bankDetails.branchName}</span>
        </p>

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
  );
};

export default PaymentDetails;
