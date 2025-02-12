"use client";

import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import AddNewAccount from "./Addnewaccount";

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
}

// Default empty values for bank details
const defaultBankDetails: BankDetails = {
  bankName: "✗",
  accountHolder: "✗",
  accountNumber: "✗",
  branchName: "✗",
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  revenue,
  revenueChange,
  subscription,
  subscriptionChange,
}) => {
  const [bankDetails, setBankDetails] = useState<BankDetails>(defaultBankDetails);
  const [isDeactivated, setIsDeactivated] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Load bank details from localStorage or sessionStorage
  useEffect(() => {
    const savedDetails = localStorage.getItem("bankDetails") || sessionStorage.getItem("bankDetails");
    if (savedDetails) {
      setBankDetails(JSON.parse(savedDetails));
    }
  }, []);

  // Save bank details to localStorage & sessionStorage whenever they change
  useEffect(() => {
    if (bankDetails.bankName !== "✗") {
      localStorage.setItem("bankDetails", JSON.stringify(bankDetails));
      sessionStorage.setItem("bankDetails", JSON.stringify(bankDetails)); // Fallback for some browsers
    }
  }, [bankDetails]);

  // Handle account deactivation toggle
  const handleDeactivate = () => {
    if (!isDeactivated) {
      // Instead of immediately deleting, prompt for confirmation.
      setShowConfirmation(true);
    } else {
      // If already deactivated, simply toggle off.
      setIsDeactivated(false);
    }
  };

  // Confirm deletion of bank details when user clicks "Yes"
  const confirmDeletion = () => {
    setIsDeactivated(true);
    setBankDetails(defaultBankDetails);
    localStorage.removeItem("bankDetails");
    sessionStorage.removeItem("bankDetails");
    setShowConfirmation(false);
  };

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
        <AddNewAccount setBankDetails={setBankDetails} />

        {/* Deactivate Account Toggle */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-500">Deactivate Account</span>
          <Switch checked={isDeactivated} onCheckedChange={handleDeactivate} />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="mb-4">Are you sure you want to delete the Bank account details?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={confirmDeletion}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setShowConfirmation(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
