"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddNewAccountProps {
  setBankDetails: React.Dispatch<React.SetStateAction<{
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    branchName: string;
  }>>;
}

const AddNewAccount: React.FC<AddNewAccountProps> = ({ setBankDetails }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Capitalize the first letter of each word
  const capitalizeFirstLetter = (text: string) => {
    return text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Validate Bank Name, Branch Name & Account Holder Name (Only Letters & Spaces)
  const validateTextInput = (input: string) => /^[A-Za-z\s]+$/.test(input);

  // Validate Account Number (Only Numbers, 8-16 Digits)
  const validateAccountNumber = (num: string) => /^[0-9]{8,16}$/.test(num);

  // Handle Form Submission
  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!validateTextInput(bankName)) {
      newErrors.bankName = "Bank name should contain only letters.";
    }
    if (!validateTextInput(accountHolder)) {
      newErrors.accountHolder = "Account holder name should contain only letters.";
    }
    if (!validateTextInput(branchName)) {
      newErrors.branchName = "Branch name should contain only letters.";
    }
    if (!validateAccountNumber(accountNumber)) {
      newErrors.accountNumber = "Account number must be 8-16 digits.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setBankDetails({
        bankName: capitalizeFirstLetter(bankName),
        accountHolder: capitalizeFirstLetter(accountHolder),
        accountNumber,
        branchName: capitalizeFirstLetter(branchName),
      });
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="bg-red-400 text-white w-full py-2 rounded-md font-medium mt-4 hover:bg-red-600">
          + ADD NEW ACCOUNT
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>

        {/* Bank Form Fields */}
        <div className="space-y-4">
          {/* Bank Name */}
          <div>
            <label className="text-gray-700 font-medium">Enter Your Bank Name:</label>
            <input
              type="text"
              placeholder="Bank Name"
              value={bankName}
              onChange={(e) => setBankName(capitalizeFirstLetter(e.target.value.replace(/[^A-Za-z\s]/g, "")))}
              className="w-full p-3 border rounded-lg bg-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="text-gray-700 font-medium">Enter Account Holder Name:</label>
            <input
              type="text"
              placeholder="Name"
              value={accountHolder}
              onChange={(e) => setAccountHolder(capitalizeFirstLetter(e.target.value.replace(/[^A-Za-z\s]/g, "")))}
              className="w-full p-3 border rounded-lg bg-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {errors.accountHolder && <p className="text-red-500 text-sm">{errors.accountHolder}</p>}
          </div>

          {/* Account Number */}
          <div>
            <label className="text-gray-700 font-medium">Enter Account Number:</label>
            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
              className="w-full p-3 border rounded-lg bg-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
              maxLength={16}
            />
            {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
          </div>

          {/* Branch Name */}
          <div>
            <label className="text-gray-700 font-medium">Enter Branch Name:</label>
            <input
              type="text"
              placeholder="Branch Name"
              value={branchName}
              onChange={(e) => setBranchName(capitalizeFirstLetter(e.target.value.replace(/[^A-Za-z\s]/g, "")))}
              className="w-full p-3 border rounded-lg bg-gray-200 focus:ring-2 focus:ring-red-400 outline-none"
            />
            {errors.branchName && <p className="text-red-500 text-sm">{errors.branchName}</p>}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleSave}
            className="bg-red-400 text-white px-4 py-2 rounded-md font-medium hover:bg-red-600"
          >
            SAVE ACCOUNT
          </button>
          <button
            onClick={() => setIsDialogOpen(false)}
            className="border px-4 py-2 rounded-md font-medium hover:bg-gray-100"
          >
            CANCEL
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewAccount;
