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

  // Validation functions
  const validateText = (input: string) => /^[A-Za-z\s]+$/.test(input);
  const validateAccountNumber = (num: string) => /^[0-9]{8,16}$/.test(num);

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!validateText(bankName) || bankName.trim() === "") {
      newErrors.bankName = "Bank name must contain only letters and spaces.";
    }

    if (!validateText(accountHolder) || accountHolder.trim() === "") {
      newErrors.accountHolder = "Account holder name must contain only letters and spaces.";
    }

    if (!validateText(branchName) || branchName.trim() === "") {
      newErrors.branchName = "Branch name must contain only letters and spaces.";
    }

    if (!validateAccountNumber(accountNumber) || accountNumber.trim() === "") {
      newErrors.accountNumber = "Account number must be 8-16 digits and contain only numbers.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      const newBankDetails = { bankName, accountHolder, accountNumber, branchName };
      setBankDetails(newBankDetails);
      localStorage.setItem("bankDetails", JSON.stringify(newBankDetails));
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Account</DialogTitle>
        </DialogHeader>

        {/* Bank Name Input */}
        <div>
          <label className="text-gray-700 font-medium">Bank Name:</label>
          <input
            type="text"
            placeholder="Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
        </div>

        {/* Account Holder Name Input */}
        <div>
          <label className="text-gray-700 font-medium">Account Holder Name:</label>
          <input
            type="text"
            placeholder="Account Holder Name"
            value={accountHolder}
            onChange={(e) => setAccountHolder(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.accountHolder && <p className="text-red-500 text-sm">{errors.accountHolder}</p>}
        </div>

        {/* Account Number Input */}
        <div>
          <label className="text-gray-700 font-medium">Account Number:</label>
          <input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
            className="w-full p-2 border rounded mt-1"
            maxLength={16}
          />
          {errors.accountNumber && <p className="text-red-500 text-sm">{errors.accountNumber}</p>}
        </div>

        {/* Branch Name Input */}
        <div>
          <label className="text-gray-700 font-medium">Branch Name:</label>
          <input
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value.replace(/[^A-Za-z\s]/g, ""))}
            className="w-full p-2 border rounded mt-1"
          />
          {errors.branchName && <p className="text-red-500 text-sm">{errors.branchName}</p>}
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
 